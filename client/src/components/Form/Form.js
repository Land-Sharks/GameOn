import React from "react";
import "./Form.css";

const Form = (props) => {
	return (
		<div className={`form ${props.formClass}`}>
			<h1>{props.title}</h1>
			<input
				className="close-button"
				type="button"
				onClick={props.closeForm}
				value="X"
			/>
			{props.children}
			<input type="button" onClick={props.submitForm}  value={props.title} />
		</div>
	);
};

export default Form;
