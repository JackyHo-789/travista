function getStreamMessage(response) {
    let message = "1.用戶需求:\n|experience|preference|total_num_client|elder|child|budget|\n|-----|-----|-----|-----|-----|-----|\n|休閒,養生,文化,風景|經濟|4|N|N|70,000|\n------\n2.行程總覽:\n|stay_days|location|location_id|from_date|to_date|\n|-----|-----|-----|-----|-----|\n|4|東京|6|2024-03-29|2024-04-01|\n------\n3.航班數據:\n3a.出發航班|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|1|CX504|250|2500|920|1430|香港國際機場|東京成田國際機場|國泰航空|N|Y||\n|2|HX604|260|1000|740|1300|香港國際機場|東京成田國際機場|香港航空|Y|N||\n|3|UO650|270|1000|1415|1945|香港國際機場|東京成田國際機場|香港快運|Y|N||\n|4|NH860|255|3031|1445|1800|香港國際機場|東京成田國際機場|全日空航空|N|Y||\n|5|JL26|250|2740|1515|1825|香港國際機場|東京成田國際機場|日本航空|N|Y||\n3b.返航航班:|flight_id|flight_code|duration|price|dept_tm|arr_time|dept_airport|arr_airport|flight_company|is_low_cost|prov_food|url|\n|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|\n|36|UO647|295|1013|1920|2315|東京成田國際機場|香港國際機場|香港快運|Y|N||\n|37|HX605|290|1547|1400|1750|東京成田國際機場|香港國際機場|香港航空|N|Y||\n|38|CX509|300|3171|915|1315|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|39|CX521|290|3200|1715|2105|東京成田國際機場|香港國際機場|國泰航空|N|Y||\n|40|JL735|280|3604|1820|2200|東京成田國際機場|香港國際機場|日本航空|N|Y||\n------\n指令:根據以上1.用戶需求,2.行程總覽,以及3.航班數據,推薦合適的航班.\n"   
    eventSource = new EventSource('http://localhost:8888/bot/msg/stream?msg=' + encodeURIComponent(message));
    eventSource.onmessage = function(event) {
        response = event.data;
        // console.log(data);
        // response = data.value;
    };
}

export default getStreamMessage;
