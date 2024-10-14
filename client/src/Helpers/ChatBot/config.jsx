import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import welcome from "../../images/welcome.jpg";
const CustomMessage = () => {
  return <img alt='' src={welcome} style={{ width: "100%" }} />;
};

const botName = "Accounting EdTool";

export const config = {
  botName: botName,
  lang: "en",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [
    createCustomMessage("Test", "custom"),
    createChatBotMessage(
      `Hi, I'm ${botName}. I’m here to help you with accountancy concepts and queries.`
    ),
    createChatBotMessage(`Please Can I know you're Email address`, {
      withAvatar: false,
      delay: 500,
    }),
  ],
  state: {
    gist: "",
    infoBox: "",
  },
  customComponents: {},
  customMessages: {
    custom: (props) => <CustomMessage {...props} />,
  },
  widgets: [],
};
