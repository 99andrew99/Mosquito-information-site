export async function call_api() {
  let today = new Date();
  let formattedDate = today.toISOString().split("T")[0];
  // console.log("날짜 테스트", formattedDate);

  const response = await fetch(
    `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_API_KEY}/xml/MosquitoStatus/1/5/${formattedDate}`
  );

  const data = await response.text();

  // XML을 JSON으로 변환
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const row = xmlDoc.getElementsByTagName("row")[0];

  // 데이터 추출
  const mosquitoDate = row.getElementsByTagName("MOSQUITO_DATE")[0].textContent;
  const mosquitoValueWater = row.getElementsByTagName("MOSQUITO_VALUE_WATER")[0]
    .textContent;
  const mosquitoValueHouse = row.getElementsByTagName("MOSQUITO_VALUE_HOUSE")[0]
    .textContent;
  const mosquitoValuePark = row.getElementsByTagName("MOSQUITO_VALUE_PARK")[0]
    .textContent;

  const result = {
    MOSQUITO_DATE: mosquitoDate,
    MOSQUITO_VALUE_WATER: mosquitoValueWater,
    MOSQUITO_VALUE_HOUSE: mosquitoValueHouse,
    MOSQUITO_VALUE_PARK: mosquitoValuePark,
  };

  // 데이터 출력
  //   console.log("MOSQUITO_DATE:", mosquitoDate);
  //   console.log("MOSQUITO_VALUE_WATER:", mosquitoValueWater);
  //   console.log("MOSQUITO_VALUE_HOUSE:", mosquitoValueHouse);
  //   console.log("MOSQUITO_VALUE_PARK:", mosquitoValuePark);

  return result;
}
