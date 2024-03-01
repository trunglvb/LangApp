/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  GiftedChat,
  IMessage,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../../../../styles/AppColors';
import {unit20} from '../../../../utils/appUnit';

type Message = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
};

const ChatComposer = (
  props: ComposerProps & {
    onSend: SendProps<IMessage>['onSend'];
    text: SendProps<IMessage>['text'];
  },
) => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        borderRadius: 30,
        backgroundColor: AppColors.light_grey,
        marginHorizontal: 16,
        marginVertical: 12,
        paddingHorizontal: 14,
      }}
      textInputProps={{
        ...props.textInputProps,
        blurOnSubmit: false,
        multiline: false,
        onSubmitEditing: () => {
          if (props.text && props.onSend) {
            props.onSend({text: props.text.trim()}, true);
          }
        },
      }}
    />
  );
};

const INITIAL_MESSAGES = [
  {
    _id: 1,
    text: 'Chào bạn',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
    },
  },
  {
    _id: 2,
    text: 'Tôi là AI giúp đỡ bạn giải nghĩa từ vựng tiếng Anh',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
    },
  },
  {
    _id: 3,
    text: 'Hiện tôi vẫn đang trong quá trình phát triển nên chưa trả lời được toàn bộ câu hỏi',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
    },
  },
  {
    _id: 4,
    text: 'Bạn hãy hỏi tôi các các từ vựng cần giải nghĩa thôi nhé',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
    },
  },
  {
    _id: 5,
    text: 'Bắt đầu thôi nào',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
    },
  },
];

const ChatGPTTab: React.FunctionComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const createInitialMessages = () => {
    try {
      const reverseArray = INITIAL_MESSAGES.reverse();
      setMessages([...reverseArray]);
    } catch (error) {}
  };

  useEffect(() => {
    createInitialMessages();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const value = messages[0].text;
    await callApi(value);
  }, []);

  const callApi = async (textValue: string) => {
    //Tài khoản OpenAI hết current quota
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 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',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: textValue,
          },
        ],
        // max_tokens: 500,
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      const value = data?.choices[0]?.message?.content;
      addNewMessage(value);
    }
  };

  const addNewMessage = (data: string) => {
    const value = {
      _id: Math.random(),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar:
          'https://gitlab.com/uploads/-/system/project/avatar/43314948/chatgpt-icon.png',
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [value]),
    );
  };
  function renderBubble(
    props: Readonly<BubbleProps<IMessage>> &
      Readonly<{
        children?: React.ReactNode;
      }>,
  ) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: AppColors.light_grey,
          },
          right: {
            backgroundColor: AppColors.purple_gradient_1,
          },
        }}
      />
    );
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          height: 20,
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: AppColors.white,
        flex: 1,
        paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight || 0 + unit20 : 0,
      }}>
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          alwaysShowSend
          onSend={messages => onSend(messages)}
          renderComposer={ChatComposer}
          //   onPressActionButton={}
          user={{
            _id: 1,
          }}
          minComposerHeight={50}
          bottomOffset={Platform.OS === 'ios' ? 83 : 0}
          minInputToolbarHeight={Platform.OS == 'android' ? 48 : 40}
          placeholder="Ask Chat GPT questions..."
          renderBubble={renderBubble}
          renderFooter={renderFooter} // THIS
          renderSend={props => {
            //Add the extra styles via containerStyle
            return (
              <Send
                {...props}
                containerStyle={{
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    padding: 12,
                    borderRadius: 100,
                    backgroundColor: AppColors.purple_gradient_2,
                    marginRight: 10,
                  }}>
                  <Feather
                    name="send"
                    style={{
                      color: AppColors.white,
                      fontSize: 20,
                    }}
                  />
                </View>
              </Send>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatGPTTab;
