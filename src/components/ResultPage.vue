<template>
    <img class="backgroundImage"/>
    <el-container>
        <el-aside>
            <el-card class="result-container">
            </el-card>
        </el-aside>
        <el-main>
            <el-card class="chatbot-container">
                <p class="chatbot-response">{{ response }}</p>
            </el-card>
        </el-main>
    </el-container>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useQueryStore } from '@/store/QueryStore.js'

    const store = useQueryStore()

    const response = ref("")
    onMounted(() => {
        console.log(JSON.stringify(store.query))
        getFlightStreamMessage(store.query)
    })
    
    const baseUrl = "https://travista.sytes.net:10889"
        
    function getFlightStreamMessage(message) {
        // let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
        const eventSource = new EventSource(baseUrl + '/bot/msg/stream?msg=' + encodeURIComponent(JSON.stringify(message)) + "&type=flight");
        eventSource.onmessage = (event) => {
            let result = event.data;
            while (result.includes("<br>")) {
                result = result.replace("<br>", "\n");
            }
            if (result.includes("<|endoftext|>")) {
                console.log("closed");
                response.value += "\n\n"
                eventSource.close();
                getHotelStreamMessage(message)
            }
            else {
                response.value += result;
            }
        };
    }

    function getHotelStreamMessage(message) {
        // let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
        const eventSource = new EventSource(baseUrl + '/bot/msg/stream?msg=' + encodeURIComponent(JSON.stringify(message)) + "&type=hotel");
        eventSource.onmessage = (event) => {
            let result = event.data;
            while (result.includes("<br>")) {
                result = result.replace("<br>", "\n");
            }
            if (result.includes("<|endoftext|>")) {
                console.log("closed");
                eventSource.close();
            }
            else {
                response.value += result;
            }
        };
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
}

.chatbot-response{
    white-space: pre;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    margin-top: 20px;
    color:darkblue;
    font-family: Arial, Helvetica, sans-serif;
}

.el-aside {
    margin-top: 18px;
    width: 15%;
    margin-left: 10%;
}

.el-card {
    overflow-y: auto;
}

</style>