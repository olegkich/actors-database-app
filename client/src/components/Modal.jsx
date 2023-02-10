import React from "react";
import "../styles/modal.css";

function Modal({ children }) {
	return (
		<div className="modal_outer">
			<div className="modal_inner">{children}</div>
		</div>
	);
}

export default Modal;
