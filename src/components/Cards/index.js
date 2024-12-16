import "./styles.css";
import { Button, Card, Row } from "antd";

const Cards = ({
  showExpenseModal,
  showIncomeModal,
  income,
  expense,
  currentBalance,
  selectedCurrency, // New prop to pass selected currency
}) => {
  return (
    <div  >
      <Row className="card-row container">
        <Card className="mycard current-balance" data-aos="fade-right">
          <h2 className="title">Current Balance</h2>
          <p>
            {currentBalance.toFixed(2)} {selectedCurrency} {/* Show currency */}
          </p>
        </Card>
        <Card className="mycard " data-aos="fade-up" >
          <h2 className="title">Total Income</h2>
          <p>
            {income.toFixed(2)} {selectedCurrency} {/* Show currency */}
          </p>
          <Button className="btn reset-balance-btn" onClick={showIncomeModal}>
            Add Income
          </Button>
        </Card>
        <Card className="mycard" data-aos="fade-left">
          <h2 className="title">Total Expenses</h2>
          <p>
            {expense.toFixed(2)} {selectedCurrency} {/* Show currency */}
          </p>
          <Button className="btn reset-balance-btn" onClick={showExpenseModal}>
            Add Expense
          </Button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
