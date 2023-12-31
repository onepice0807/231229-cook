import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalProce, item) => totalProce + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideChackout();
  }

  function handleFinish() {
    userProgressCtx.hideChackout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        닫기
      </Button>
      <Button>주문 하기</Button>
    </>
  );

  if (isSending) {
    actions = <span>주문 데이터 전송...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>성공!</h2>
        <p>주문이 성공적으로 제출되었습니다.</p>
        <p>몇 분 내로 이메일을 통해 자세한 내용을 알려드리겠습니다.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>확인</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>결재</h2>
        <p>총 금액 : {currencyFormatter.format(cartTotal)}</p>
        <Input label="전체 이름" type="text" id="name" />
        <Input label="이메일 주소" type="email" id="email" />
        <Input label="거리명" type="text" id="street" />
        <div className="control-row">
          <Input label="우편주소" type="text" id="postal-code" />
          <Input label="도시" type="text" id="city" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
