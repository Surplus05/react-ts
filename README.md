# react-ts

바로가기  
https://surplus05.github.io/react-ts  
  
컴포넌트 폴더 구조  
![image](https://user-images.githubusercontent.com/104773096/216750682-a7311e13-2035-4359-92bd-b68245963409.png)


# 1. Main page ( component/body/Main.tsx )
![image](https://user-images.githubusercontent.com/104773096/216751155-dc61c729-fb69-4f36-a91d-77605768a233.png)
  
  
# 2. Main Page - Popup ( component/body/PopupItem.tsx )  
![image](https://user-images.githubusercontent.com/104773096/216751131-87ec598a-e25a-45ef-8623-df2d063c4544.png)

  
 
# 3. Watch With Page ( component/body/watch/Watch.tsx )
![image](https://user-images.githubusercontent.com/104773096/216751091-ff6b8c99-883a-4ad0-b4bc-2e1b02b6f523.png)

같이보기 ( component/body/watch/Watch.tsx ) 의 경우  
Main Page 에서 영상 클릭하거나 마우스 머물러 Popup 을 띄우고, Main Page - Popup 우측 같이보기 클릭해서 진입 가능  
https://surplus05.github.io/react-ts/#/watch?v=YQHsXMglC9A&c=UComP_epzeKzvBX156r6pm1Q  
API 호출 횟수를 줄이기 위해 링크 타고 들어가면 영상정보는 표시되지 않음.  
    
# 4. User Page ( component/user/User.tsx )
![image](https://user-images.githubusercontent.com/104773096/216751076-d8a996b3-75e5-400c-8280-c468f232b210.png)
  
  
마치며..  
hooks, context, service 는 component가 아니라 다른폴더에 두는게 더 맞는것 같다.  
넷플릭스에서 창 사이즈에 따라 크기가 알맞게 변하기도 하고 동영상 창이 16:9비율을 유지해야 하므로 미디어 쿼리 대신 context api를 써서 반응형으로 구현했는데 나름 괜찮았다.  
그래도 저런 특수한 상황이 아니라면 다음엔 Redux 쓸 것 같다.    
재사용성 고려한다고 컴포넌트랑 커스텀훅을 남발했는데, 하나씩 자잘자잘하게 수정할게 있어서 복붙이 더 편했고 막상 재사용은 많이 못했다.  
css는 css파일에서 처리하는게 맞다고 생각했었다. css in js 방식으로 구현하니 파일도 줄어들고 스크롤만 올리면 되니 훨씬 편했다.  
firebase 에서 orderByChild 를 사용했는데, snapshot.val() 호출시 바로 정렬된 결과를 리턴하는줄 알고 왜 정렬이 안되는지 한참을 방황했다.  
리팩토링하면서 내가 왜 이렇게 비효율적으로 작성했지? 라는 코드가 많았다. 리팩토링을 마무리하며 하는게 아니라 수시로 해줘야겠다. 초창기 작성한 코드는 기억이 가물가물하기도 했으니..  
닉네임을 바꾸면 기존 채팅도 바뀌면 좋겠는데 채팅 하나하나마다 user 정보를 가져온다면 서버 부하가 너무 커질것이라 NoSql 에서는 좋은 방법을 찾지 못했다.  관계형DB였다면 USER 테이블을 외래키로 참조하는 방식으로 구현할 수 있었을 것 같아 아쉽다.  
다음엔 Next.js 나 sql 을 사용해 보고싶다.  
  
  
추가사항  
모바일의 경우 touchevent 굳이 구현해줄 필요 없이 그냥 scroll 옵션을 주고 스크롤바를 보여주지 않으면 된다.. 구현할때 100ms 단위로 좌표를 구해 velocity 계산해서 터치 종료 이후에도 스크롤이 지속되게 해볼까 생각 했었는데 괜히 뻘짓했다.  
