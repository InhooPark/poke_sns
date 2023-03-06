# TEAM-A

## ver0.1.0
* 변경사항
  * 최초 테스트 업로드


+ 참고사항
  + 설치 후 npm install next
  + db table 추가/ 변경 이후 npx prisma generate 
  + db 내용 보기 npx prisma studio

- git 사용법
 - git commit -m "커밋 메시지"
 - git branch -M "브랜치 이름"
 - git remote add origin https://github.com/InhooPark/team-a.git
 - git push -u origin "브랜치 이름"




### 설명

#### Pages
|페이지 명|역할|
|:---|:---|
|index|첫 페이지|
|main|로그인 후 보여지는 화면|
|signin|로그인 페이지|
|signup|회원가입 페이지|
#### Components
|컴포넌트 명|역할|
|:---|:---|
|Headmeta|메타태그 변경 (탭 이름)|
|Layout|레이아웃 프레임|
|Header|헤더|
|Nav|좌측 네비게이션 (메뉴)|
|Profile|우측 프로필 (aside)|
|Sign|로그인 여부 판단 후 로그인/ 회원가입 페이지 이동|
|Signnav|로그인/ 회원가입 토글 버튼|
|Maincontents|로그인 후 컨텐츠 출력 위치|
|List|코멘트 리스트|
|Encyclopedia|도감|
|Myprofile|개인정보 수정/ 삭제|
|Searchlist|검색 결과 출력|
