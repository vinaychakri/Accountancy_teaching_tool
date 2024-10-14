import React from "react";
import noIdea from "../../images/noIdea.png";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const askForEmail = () => {
    const botMessage = createChatBotMessage(
      "Thanks for confirming, How can I help you..?"
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleDefault = () => {
    const botMessage = createChatBotMessage(
      <>
        <img alt='' src={noIdea} style={{ width: "100%" }} />
        <b>Contact Professor</b>
      </>
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const askForAccountancy = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Accounting is the process of recording financial transactions
          pertaining to a business. The accounting process includes summarizing,
          analyzing, and reporting these transactions to oversight agencies,
          regulators, and tax collection entities. The financial statements used
          in accounting are a concise summary of financial transactions over an
          accounting period, summarizing a company's operations, financial
          position, and cash flows.
        </i>
      </>
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const provideFinancialStatementsInfo = () => {
    const botMessage = createChatBotMessage(
      <>
        <p>
          <b>Financial Statements:</b>
        </p>
        <p>
          Financial statements are formal records of the financial activities
          and position of a business, person, or other entity. They provide an
          overview of a business's profitability and financial condition in both
          short and long term.
        </p>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const provideDoubleEntryAccountingInfo = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Double-entry accounting is a fundamental concept in accounting where
          every transaction affects at least two accounts. It ensures that the
          accounting equation (Assets = Liabilities + Equity) is always in
          balance.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainGAAP = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          GAAP is a set of accounting principles, standards, and procedures that
          companies follow when preparing financial statements. It ensures
          consistency, comparability, and accuracy in financial reporting.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainAuditing = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Auditors play a crucial role in accounting by examining financial
          statements to ensure accuracy and compliance. They provide an
          independent assessment of a company's financial health.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainTaxationInAccounting = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Taxation in accounting involves understanding and complying with tax
          laws. It includes calculating and reporting income taxes and managing
          tax liabilities.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const provideManagerialAccountingInfo = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Managerial accounting focuses on providing internal stakeholders with
          information for decision-making. It includes budgeting, cost analysis,
          and performance evaluation.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainDepreciation = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Depreciation is the systematic allocation of the cost of a tangible
          asset over its useful life. It reflects the decrease in value of
          long-term assets.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const provideFinancialRatiosInfo = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Financial ratios are tools used to analyze a company's financial
          performance. They provide insights into areas such as liquidity,
          profitability, and solvency.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainBookkeeping = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Bookkeeping involves the daily recording of financial transactions. It
          lays the foundation for accurate financial reporting and helps in
          maintaining organized financial records.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const explainAccrualAccounting = () => {
    const botMessage = createChatBotMessage(
      <>
        <i>
          Accrual accounting recognizes revenue and expenses when they are
          earned or incurred, regardless of when the cash is received or paid.
          It provides a more accurate picture of a company's financial position.
        </i>
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            askForEmail,
            handleDefault,
            askForAccountancy,
            provideFinancialStatementsInfo,
            provideDoubleEntryAccountingInfo,
            explainGAAP,
            explainAuditing,
            explainTaxationInAccounting,
            provideManagerialAccountingInfo,
            explainDepreciation,
            provideFinancialRatiosInfo,
            explainBookkeeping,
            explainAccrualAccounting,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
