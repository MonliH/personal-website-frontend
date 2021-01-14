import { ForwardedRef, useState, forwardRef } from "react";
import { animated, useSpring } from "react-spring";

import * as Form from "@lib/form";
import { WrapperCenter, WrapperInner } from "@components/Wrapper";
import { Title } from "@components/Title";

import styled from "styled-components";

const ContactStyled = styled.div`
  height: 100vh;
  padding-top: 100px;
  margin-top: -100px;
`;

const ContactForm = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;
  width: 500px;
  font: "Montserrat", sans-serif;

  @media (max-width: 580px) {
    width: 80vw;
    padding-bottom: 50px;
  }
`;

const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 580px) {
    flex-direction: column;
  }
`;

const Entry = styled.label`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-bottom: 20px;
  flex: 0 0 245px;

  @media (max-width: 580px) {
    flex: 0 0 0;
    width: 80vw;
  }
`;

const EntryText = styled.div`
  margin-bottom: 10px;
  color: white;
  font: bold 17px Montserrat, sans-serif;
`;

const EntryInput = styled.input`
  height: 45px;
  background-color: #1d1d1d;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid;
  color: white;
  padding-left: 7px;
`;

const MessageTextarea = styled.textarea`
  height: 250px;
  background-color: #1d1d1d;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid;
  color: white;
  padding: 7px;
  font: 14px "Montserrat", sans-serif;
`;

const ContactMessage = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ContactButtonLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled(animated.button)`
  width: 110px;
  height: 40px;
  border: 2px solid;
  color: white;
  background-color: #1d1d1d;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 2px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: 0.5s;
  flex: 0 0 110px;
`;

const Contact = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  let [status, setStatus] = useState("");

  let [anim, setOpacity] = useSpring(() => ({
    backgroundColor: "#1d1d1d",
  }));

  const onMouseEnter = () => {
    setOpacity({ backgroundColor: "rgb(10, 10, 10)" });
  };

  const onMouseLeave = () => {
    setOpacity({ backgroundColor: "#1d1d1d" });
  };

  return (
    <ContactStyled ref={ref}>
      <WrapperCenter>
        <WrapperInner>
          <Title>Contact Me&thinsp;</Title>
          <ContactForm onSubmit={(e) => Form.submit(e, setStatus)}>
            <EntryContainer>
              <Entry>
                <EntryText>Your Email:</EntryText>
                <EntryInput
                  type="email"
                  name="_replyto"
                  id="email"
                  placeholder="Email"
                  required
                />
              </Entry>
              <Entry>
                <EntryText>Your Name:</EntryText>
                <EntryInput
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
              </Entry>
            </EntryContainer>
            <ContactMessage>
              <EntryText>Your message:</EntryText>
              <MessageTextarea
                name="message"
                style={{ resize: "none" }}
                id="message-textarea"
                placeholder="Message"
                required
              />
            </ContactMessage>
            <ContactButtonLabel>
              <SendButton
                type="submit"
                style={anim as any}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                Send
              </SendButton>
              <EntryText
                style={{
                  marginLeft: "20px",
                  marginTop: "7px",
                }}
              >
                {status}
              </EntryText>
              <noscript>
                <EntryText
                  style={{
                    marginTop: "7px",
                  }}
                >
                  You need to enable javascript to send me a message, sorry for
                  the inconvenience
                </EntryText>
              </noscript>
            </ContactButtonLabel>
          </ContactForm>
        </WrapperInner>
      </WrapperCenter>
    </ContactStyled>
  );
});

export default Contact;
