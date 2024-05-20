<template>
    <img class="backgroundImage"/>
    <el-container>
        <el-aside>
            <el-card class="result-container">
                <!-- <template #header>
                    <div class="card-header" style="position: fixed;">
                        <span>行程安排</span>
                    </div>
                </template> -->
                <el-card v-for="card in resultCards" style="margin-bottom: 3px;">
                    <el-row :span="24">
                        <el-col :span="8">
                            <el-image style="width: 50px; height: 50px; border-radius: 10px; " :src="card.image" :fit="fit" />
                        </el-col>
                        <el-col :span="16">
                            <p>{{ card.title }}</p>
                            <el-button @click="openNewPage(card.url)">Book</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-card>
        </el-aside>
        <el-main>
            <el-card class="chatbot-container">
                <template #header>
                    <div class="card-header">
                        <div>
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                        </div>
                        <span class="robot-name">Travista AI</span>
                    </div>
                </template>

                <p class="chatbot-response">{{ response }}</p>

                <!-- <div id = "loading">
                    <svg class="circular" viewBox="0 0 50 50">
                        <circle class="path" cx="25" cy="25" r="20" fill="none" />
                    </svg>
                </div> -->

            </el-card>
        </el-main>
    </el-container>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useQueryStore } from '@/store/QueryStore.js'

    const store = useQueryStore()
    const resultCards = ref([])

    const response = ref("")
    onMounted(() => {
        console.log(JSON.stringify(store.query))
        getFlightStreamMessage(store.query)
        // document.getElementById("loading").style.visibility = "";
    })

    function openNewPage(url) {
        console.log("open link")
        window.open(url, '_blank');
    }

    const baseUrl = "https://travista.sytes.net:10889"
        
    function getFlightStreamMessage(message) {
        let flight_id = ""
        let flight_id_enabled = false
        // let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
        const eventSource = new EventSource(baseUrl + '/bot/msg/stream?msg=' + encodeURIComponent(JSON.stringify(message)) + "&type=flight");
        eventSource.onmessage = (event) => {
            // document.getElementById("loading").style.visibility = "hidden";
            let result = event.data;
            // console.log(result);
            while (result.includes("<br>")) {
                result = result.replace("<br>", "\n");
            }
            // console.log(response.value.includes("<|flight_id_start|>"))
            if (response.value.includes("<|flight_id_start|>") && !flight_id_enabled) {
                flight_id_enabled = true
                response.value = response.value.replace("<|flight_id_start|>","")
                flight_id += result
            } 
            else if (flight_id_enabled) {
                flight_id += result
                if (flight_id.includes("<|flight_id_end|>")) {
                    flight_id = flight_id.replace("<|flight_id_end|>","").replace("\n","")
                    flight_id_enabled = false
                    console.log(flight_id)
                    callResouceApi(flight_id, "flight")
                    flight_id = ""
                } 
            }
            else if (result.includes("<|endoftext|>")) {
                console.log("closed");
                response.value += "\n\n"
                eventSource.close();
                getHotelStreamMessage(message)
            } else {
                response.value += result;
                scrollToBottom();
            }
        };
    }

    function getHotelStreamMessage(message) {
        let hotel_id = ""
        let hotel_id_enabled = false
        // let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
        const eventSource = new EventSource(baseUrl + '/bot/msg/stream?msg=' + encodeURIComponent(JSON.stringify(message)) + "&type=hotel");
        eventSource.onmessage = (event) => {
            let result = event.data;
            while (result.includes("<br>")) {
                result = result.replace("<br>", "\n");
            }
            if (response.value.includes("<|hotel_id_start|>") && !hotel_id_enabled) {
                hotel_id_enabled = true
                response.value = response.value.replace("<|hotel_id_start|>","")
                hotel_id += result
            } 
            else if (hotel_id_enabled) {
                hotel_id += result
                if (hotel_id.includes("<|hotel_id_end|>")) {
                    hotel_id = hotel_id.replace("<|hotel_id_end|>","").replace("\n","")
                    hotel_id_enabled = false
                    console.log(hotel_id)
                    callResouceApi(hotel_id, "hotel")
                    hotel_id = ""
                } 
            }
            else if (result.includes("<|endoftext|>")) {
                console.log("closed");
                response.value += "\n\n"
                eventSource.close();
                getSightStreamMessage(message)
            }
            else {
                response.value += result;
                scrollToBottom();
            }
        };
    }

    function scrollToBottom() {
        var cardElement = document.querySelector('.chatbot-response');
        // cardElement.scrollIntoView(false);
        // console.log(cardElement.scrollHeight)
        cardElement.scrollTop = cardElement.scrollHeight;
    }

    function getSightStreamMessage(message) {
        let sight_id = ""
        let sight_id_enabled = false
        // let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
        const eventSource = new EventSource(baseUrl + '/bot/msg/stream?msg=' + encodeURIComponent(JSON.stringify(message)) + "&type=sight");
        eventSource.onmessage = (event) => {
            let result = event.data;
            while (result.includes("<br>")) {
                result = result.replace("<br>", "\n");
            }
            if (response.value.includes("<|sight_id_start|>") && !sight_id_enabled) {
                sight_id_enabled = true
                response.value = response.value.replace("<|sight_id_start|>","")
                sight_id += result
            }
            else if (sight_id_enabled) {
                sight_id += result
                if (sight_id.includes("<|sight_id_end|>")) {
                    sight_id = sight_id.replace("<|sight_id_end|>","").replace("\n","")
                    sight_id_enabled = false
                    console.log(sight_id)
                    // callResouceApi(sight_id, "sight")
                    sight_id = ""
                } 
            }
            else if (result.includes("<|endoftext|>")) {
                console.log("closed");
                response.value += "\n\n"
                eventSource.close();
            }
            else {
                response.value += result;
                scrollToBottom();
            }
        };
    }

    function callResouceApi(id, type) {
        // Set the URL and parameters
        let url = "https://travista.sytes.net:10889/bot/msg/resource"
        let params = {
            id: id,
            type: type
        };

        // Format the parameters into a query string
        let queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');

        // Make the GET request
        fetch(url + '?' + queryString)
        .then(response => response.json())
        .then(data => {
            // Process the response data
            let jsonResult = JSON.parse(data)
            console.log(jsonResult);
            resultCards.value.push(jsonResult)
            console.log(resultCards)
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
    }

</script>
<style scoped>
.backgroundImage {
  width: 100%;
  height: 100%;
  object-fit:fill;
  object-position: center;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/mounteverest.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  /* border-radius: 0px 0px 100% 100%; */
}
:deep(.el-card__header){
    background-color: aliceblue;
}
.el-container {
    margin-top: 20px;
}

.chatbot-container {
    height: 70vh;
    max-width: 90%;
    border-radius: 10px;
}

.result-container {
    height: 70vh;
    border-radius: 10px;
    background-color: aliceblue;
}

.chatbot-response{
    white-space: pre;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    margin-top: 20px;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    overflow-x: auto;
    max-height: 50vh;
}

.el-aside {
    margin-top: 18px;
    width: 15%;
    margin-left: 10%;
}

.el-card {
    overflow-x: auto;
    border-radius: 10px;
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}

.card-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20px;
    gap: 10px;
}
</style>