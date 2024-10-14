import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowercaseMessage = message.toLowerCase();

    switch (true) {
      case lowercaseMessage.includes("hello") ||
        lowercaseMessage.includes("hai"):
        actions.handleHello();
        break;
      case lowercaseMessage.includes("@gmail.com"):
        actions.askForEmail();
        break;
      case lowercaseMessage.includes("accountancy") ||
        lowercaseMessage.includes("accounting") ||
        lowercaseMessage.includes("accountant") ||
        lowercaseMessage.includes("tool"):
        actions.askForAccountancy();
        break;
      case lowercaseMessage.includes("financial") ||
        lowercaseMessage.includes("finance") ||
        lowercaseMessage.includes("statement") ||
        lowercaseMessage.includes("tool"):
        actions.provideFinancialStatementsInfo();
        break;
      case lowercaseMessage.includes("double-entry") ||
        lowercaseMessage.includes("accounting equation") ||
        lowercaseMessage.includes("assets = liabilities + equity"):
        actions.provideDoubleEntryAccountingInfo();
        break;
      case lowercaseMessage.includes("gaap") ||
        lowercaseMessage.includes("generally accepted accounting principles"):
        actions.explainGAAP();
        break;
      case lowercaseMessage.includes("audit") ||
        lowercaseMessage.includes("auditing"):
        actions.explainAuditing();
        break;
      case lowercaseMessage.includes("tax") ||
        lowercaseMessage.includes("taxation") ||
        lowercaseMessage.includes("income tax"):
        actions.explainTaxationInAccounting();
        break;
      case lowercaseMessage.includes("managerial accounting") ||
        lowercaseMessage.includes("management accounting"):
        actions.provideManagerialAccountingInfo();
        break;
      case lowercaseMessage.includes("depreciation"):
        actions.explainDepreciation();
        break;
      case lowercaseMessage.includes("financial ratios") ||
        lowercaseMessage.includes("ratios in accounting"):
        actions.provideFinancialRatiosInfo();
        break;
      case lowercaseMessage.includes("bookkeeping") ||
        lowercaseMessage.includes("record transactions"):
        actions.explainBookkeeping();
        break;
      case lowercaseMessage.includes("accrual accounting"):
        actions.explainAccrualAccounting();
        break;
      default:
        actions.handleDefault();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
