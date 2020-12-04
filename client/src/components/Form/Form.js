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

			{
				props.successful ? <p>Successful</p>
					: props.children
			}
			
			<input className="submit-button" type="button" onClick={props.submitForm}  value={props.title} />
			
		</div>
	);
};

export default Form;
