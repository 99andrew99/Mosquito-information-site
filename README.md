# Mosquito-information-site

서울지역 모기발생 상황을 지수화하여 모기발생 단계별 시민행동요령을 알려주는 일일 모기발생 예보서비스입니다.

웹 페이지 배포는 mixed content 오류 때문에 api를 받아올 수 없어서 이 문제 해결중입니다.

<mixed content 오류>

API는 http로 지원된다
따라서 개발 환경인 http에서는 문제 없이 API가 콜 되지만, 배포 환경(https일 경우)에서는 Mixed Content 문제가 발생한다. (HTTPS에서는 HTTP 콘텐츠를 로딩하지 않는다.)


pc와 모바일 모두 다 접근 가능하도록 반응형으로 구현하였습니다.

# <PC 화면>
![image](https://github.com/99andrew99/Mosquito-information-site/assets/66951806/85286519-a712-4e28-8e22-5602399054fa)
서울시 평균 모기지수가 25 미만이면 쾌적단계(모기 1마리), 25 이상 50 미만이면 관심단계(모기 2마리), 50 이상 75 미만은 주의단계(모기 3마리), 75 이상은 불쾌단계(모기 4마리)

![image](https://github.com/99andrew99/Mosquito-information-site/assets/66951806/f9031bb9-15cd-4205-ad06-2e116ca83fb0)
당일 모기 포집 개체수 데이터와 기상청 기상자료를 연동분석하여 모기 발생예측도를 수치화한 데이터를 보여줍니다.

# 모바일 화면

![image](https://github.com/99andrew99/Mosquito-information-site/assets/66951806/24e86e15-36e1-46f9-9ad2-3d140e7151d9)


![image](https://github.com/99andrew99/Mosquito-information-site/assets/66951806/3b60a48e-b557-44c8-8625-5b56ea34c03c)
