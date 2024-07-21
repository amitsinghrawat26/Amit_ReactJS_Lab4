import { useSubmit } from "react-router-dom";
import { postDataToServer } from "../Service/service";
import { useState } from "react";

function AddExpense(props){

    const [payeeName, setPayeeName ] = useState("")
    const [price, setPrice ] = useState(0)
    const [product, setProduct ] = useState("")
    const [setDate, setSetDate ] = useState("05-05-2024")

    const handlePayeeChange = (e) => {
        setPayeeName(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(parseInt(e.target.value))
    }

    const handleProductChange = (e) => {
        setProduct(e.target.value)
    }

    const handleDateChange = (e) => {
        setSetDate(e.target.value)
    }  
    const handleSubmit = async (event) =>  {
        event.preventDefault();
        const reponse = {
            payeeName,
            product,
            price,
            setDate
        }
        const data = await postDataToServer(reponse);
        props.onTrue()
    }
    return(
        <section>
                <header className="form-header">
                    <h1>Add New Item</h1>
                    <p><span className="note">Read the below instructions before processing</span> <br/>
                    Make sure you fill all the fields where * is provided</p>
                </header>

            <form onSubmit={handleSubmit} className="form-data">
                <article className="form-data-input">
                    <p>Name<span className="note">*</span>: </p>
                    <select required value={payeeName} onChange={handlePayeeChange}>
                        <option value="Choose" defaultChecked>Choose</option>
                        <option value="Rahul" defaultChecked>Rahul</option>
                        <option value="Ramesh" defaultChecked>Ramesh</option>
                    </select>
                </article>

                <article className="form-data-input">
                    <p>Product Purchased<span className="note">*</span>: </p>
                    <input type="text"
                    value={product} onChange={handleProductChange}></input>
                </article>

                <article className="form-data-input">
                    <p>Price<span className="note">*</span>: </p>
                    <input type="number"
                    value={price} onChange={handlePriceChange}></input>
                </article>

                <article className="form-data-input">
                    <p>Date<span className="note">*</span>: </p>
                    <input type="date"
                    value={setDate} onChange={handleDateChange}></input>
                </article>
                <article className="form-data-input-btn">
                    <button onClick={props.onClose} className="form-btn">Close</button>
                    <button type="submit" className="form-btn">Submit</button>
                </article>
            </form>
        </section>
    )
}

export default AddExpense;