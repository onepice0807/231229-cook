# React + Vite

# 2023-12-30 음식주문 사이트

- App.jsx
1. Checkout, Header, Meals, Cart 컴포넌트를 import하여 사용
2. CartContextProvider와 UserProgressContextProvider 를 이용하여 컨텍스트를 제공
3. 애플리케이션의 레이아웃을 정의하고, 컴포넌트를 렌더링

- Meals.jsx
1. Meals 컴포넌트는 식사 목록을 가져와서 렌더링
2. 데이터 로딩 중인 경우 "불러오는중..."이라는 문구를 화면에 표시
    1. useHttp 커스텀 훅을 사용하여 http://localhost:3000/meals 주소로 HTTP 요청을 보내고, 응답 데이터를 받아오기
3. 데이터 로딩이 완료된 경우 loadedMeals 배열을 map 함수를 사용하여 각각의 MealItem 컴포넌트로 변환하여 화면에 렌더링
4. 데이터 로딩 중 또는 에러가 발생한 경우 Error 컴포넌트를 화면에 렌더링

- MealItem.jsx
1. useContext를 사용하여 CartContext를 import 하여 사용
2. meal 객체를 받아와서 장바구니에 추가하는 기능을 구현
3. meal 객체를 받아와 화면에 렌더링(이미지, 제목, 가격, 설명 등이 포함)

- Modal.jsx
1. useEffect와 useRef를 사용하여 모달 창의 동작을 관리
2. open prop에 따라 모달 창 오픈여부 정의
3. children을 포함한 내용을 모달 창 안에 렌더링
4. createPortal을 사용하여 모달 창을 최상위 DOM 요소에 렌더링

- Checkout.jsx
1. 주문 정보를 입력하고 제출하는 컴포넌트
2. useHttp 커스텀 훅을 사용하여 http://localhost:3000/meals 주소로 HTTP 요청을 보내고, 응답 데이터를 받아오기
3. CartContext와 UserProgressContext를 사용하여 카트 정보와 사용자 진행 상태를 가져오기
4. 주문 데이터를 전송하는 handleSubmit 함수를 통해 전달
5. 데이터 전송 중인 경우 "주문 데이터 전송..."이라는 문구를 화면에 렌더링
6. 데이터 전송이 성공하고 에러가 없는 경우 "성공!" 메시지와 확인 버튼이 있는 모달을 화면에 렌더링
7. 데이터 전송 중 또는 에러가 발생한 경우 Error 컴포넌트를 화면에 렌더링
- Error.jsx
1. Error 컴포넌트는 에러 메시지를 표시하는 역할
2. title과 massage라는 두 개의 프로퍼티를 받아와서 제목과 메시지를 화면에 렌더링

- useHttp.js
1. useHttp 커스텀 훅은 HTTP 요청을 보내고 응답 데이터를 처리하는 로직을 재사용하기 위해 만들어진 훅
2. sendHttpRequest 함수를 사용하여 HTTP 요청을 보내고, 응답 데이터를 받아오기
3. data, isLoading, error, sendRequest, clearData라는 다섯 가지 상태와 함수를 반환
4. sendRequest 함수는 요청을 보내고 응답을 처리하는 역할
5. clearData 함수는 데이터 상태를 초기화하는 역할
6. useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 config가 변경될 때마다 sendRequest 함수를 호출
7. useEffect 훅을 사용하여 초기 렌더링 시 또는 config가 GET 메서드인 경우에만 요청을 보낸다

- Button.jsx
1. textOnly prop이 주어지면 text-button 클래스를, 그렇지 않으면 button 클래스
2. className prop과 함께 전달되는 클래스도 추가
3. children prop은 버튼 내부에 렌더링되는 내용

- CartContext.jsx
1. CartContext는 React의 createContext 함수를 사용하여 생성된 컨텍스트 객체
2. items, addItem, removeItem, clearCart의 기본값을 가진다
3. items는 장바구니에 있는 항목들을 담는 배열
4. addItem은 장바구니에 항목을 추가하는 함수
5. removeItem은 장바구니에서 특정 항목을 제거하는 함수
6. clearCart는 장바구니를 초기화 하는 함수

- cartReducer.jsx
1. cartReducer는 장바구니 상태를 관리하는 Reducer 함수
2. ADD_ITEM 액션을 처리하여 장바구니에 항목을 추가
3. REMOVE_ITEM 액션을 처리하여 장바구니에서 항목을 제거
4. 현재 상태와 액션을 기반으로 새로운 상태를 반환

- CartContextProvider.jsx
1. CartContext를 제공하는 컴포넌트
2. cart 상태와 dispatchCartAction 함수를 cartReducer를 사용하여 생성
3. addItem, removeItem, clearCart 함수는 dispatchCartAction을 통해 액션을 디스패치
4. CartContext.Provider로 자식 컴포넌트에 CartContext를 제공

- UserProgressContext.jsx
1. UserProgressContext는 React의 createContext 함수를 사용하여 생성된 컨텍스트 객체
2. progress, showCart, hideCart, showCheckout, hideCheckout의 기본값을 가진다
3. showCart는 장바구니를 표시하는 함수
4. hideCart는 장바구니를 숨기는 함수
5. showCheckout은 결제 단계를 표시하는 함수
6. hideCheckout은 결제 단계를 숨기는 함수

- UserProgressContextProvider.jsx
1. UserProgressContext를 제공하는 컴포넌트
2. userProgress 상태와 해당하는 함수들을 생성하고 컨텍스트 값으로 제공
