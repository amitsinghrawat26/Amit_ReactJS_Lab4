import { useEffect, useState } from 'react';
import { getDataFromServer } from '../Service/service';
import AddExpense from './AddExpense';

function ShowData(){

    const [items, setItems] = useState([])
    const [showForm, setShowForm] = useState(false)

    const [sum, setSum] = useState(0)
    const [rahulSpent, setRahulSpent] = useState(0)
    const [rameshSpent, setRameshSpent] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDataFromServer();
            setItems(data)
            setSum(data.reduce((res, each) => (res = res + each.price),0));
            let rahulSpentAmount = 0;
            let rameshSpentAmount = 0;
            data.map((each) => each.payeeName === "Rahul" ? (rahulSpentAmount = rahulSpentAmount + each.price): (rameshSpentAmount = rameshSpentAmount + each.price));
            setRahulSpent(rahulSpentAmount);
            setRameshSpent(rameshSpentAmount);
       };

        fetchData();
    },[showForm]);

    function sucess(){
        setShowForm(true);
    }
    function cancel(){
        setShowForm(false);
    }

    return(
        <>
            <header id="page-header">Expense Tracker</header>
            <button id="add-button" onClick={() => setShowForm(true)}>Add</button>
            {showForm && (
                <div className='form'> 
                    <AddExpense onTrue={sucess} onClose={cancel}></AddExpense>
                </div>
            )}  

            <div className='use-inline date header-color'>Date</div>
            <div className='use-inline header-color'>Product Purchased</div>
            <div className='use-inline price header-color'>Price</div>
            <div className='use-inline header-color payee'>Payee</div>

            {items && items.map((eachItems) => (
                <div>
                    <div className='use-inline date'>{eachItems.setDate}</div>
                    <div className='use-inline'>{eachItems.product}</div>
                    <div className='use-inline price'>{eachItems.price}</div>
                    <div className='use-inline payee'>{eachItems.payeeName}</div>
                </div>
            ))}
            <hr></hr>

            <div className='use-inline'>Total: </div>
            <span className='use-inline total'>{sum}</span>
            <div className='use-inline'>Rahul Spent: </div>
            <span className='use-inline total rahul'>{rahulSpent}</span>
            <div className='use-inline'>Ramesh Spent: </div>
            <span className='use-inline total ramesh'>{rameshSpent}</span>
            <span className='use-inline payable'>{rahulSpent > rameshSpent ? "Pay Rahul ": "Pay Ramesh"}</span>
            <span className='use-inline payable price'>{Math.abs((rahulSpent + rameshSpent)/2)}</span>

        </>

    )    
}

export default ShowData;