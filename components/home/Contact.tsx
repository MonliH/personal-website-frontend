import { useState } from "react";
import styled from "styled-components";

import submit from "@lib/contact_api/submitForm";
import BackHome from "@components/BackHome";

const Title = styled.h1`
  font: 800 30px ${(props) => props.theme.fonts.sansSerif};
  font-weight: black;
  margin: 0;
  cursor: default;
  padding: 0;
  width: fit-content;
  margin-bottom: 50px;
`;

const ContactWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkerBg};
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContactForm = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;
  width: 500px;
  font-family: ${({ theme }) => theme.fonts.sansSerifAlt};
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
  color: #c7c7c7;
  font: bold 17px ${({ theme }) => theme.fonts.sansSerifAlt};
`;

const EntryInput = styled.input`
  height: 45px;
  background-color: #1d1d1d;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid;
  color: white;
  padding-left: 7px;
  &:focus {
    outline: 1px solid #ffffff;
  }
`;

const MessageTextarea = styled.textarea`
  height: 250px;
  background-color: #1d1d1d;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid;
  color: white;
  padding: 7px;
  font: 14px ${({ theme }) => theme.fonts.sansSerifAlt};

  &:focus {
    outline: 1px solid #c7c7c7;
  }
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

const SendButton = styled.button`
  width: 110px;
  height: 40px;
  border: 1px solid;
  color: white;
  background-color: ${({ theme }) => theme.colors.darkerBg};
  border-radius: 2px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: 0.5s;
  flex: 0 0 110px;

  &:hover {
    background-color: #1a1a1a;
  }
`;

const Contact = () => {
  const [status, setStatus] = useState("");

  return (
    <ContactWrapper>
      <BackHome />
      <Title>Let&apos;s get in touch</Title>
      <ContactForm onSubmit={(e) => submit(e, setStatus)}>
        <EntryContainer>
          <Entry>
            <EntryText>Your Email:</EntryText>
            <EntryInput
              type="email"
              name="email"
              id="email"
              placeholder="e.g. john.doe@example.com"
              required
            />
          </Entry>
          <Entry>
            <EntryText>Your Name:</EntryText>
            <EntryInput
              type="text"
              name="sender_name"
              placeholder="e.g. John Doe"
              required
            />
          </Entry>
        </EntryContainer>
        <ContactMessage>
          <EntryText>Your message:</EntryText>
          <MessageTextarea
            name="contents"
            style={{ resize: "none" }}
            id="message-textarea"
            placeholder="Message"
            required
          />
        </ContactMessage>
        <ContactButtonLabel>
          <SendButton type="submit">Send</SendButton>
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
              You need to enable javascript to send me a message, sorry for the
              inconvenience
            </EntryText>
          </noscript>
        </ContactButtonLabel>
      </ContactForm>
    </ContactWrapper>
  );
};

export default Contact;
