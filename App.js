import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  Alert,
  Keyboard
} from 'react-native';

function Header (props) {
  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>
        机器人
      </Text>
    </View>
  )
}

function MessageItem ({message}) {
  return (
    <View style={[styles.message, {flexDirection: message.speaker === 'self' ?  'row-reverse' : 'row' }]}>
      <View style={{
        flex: 0,
        backgroundColor: message.speaker === 'self' ? '#AEF16B' : '#F7F8F7',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 8,
        maxWidth: 300,
      }}>
        <Text style={{lineHeight: 20}}>
          { message.content }
        </Text>
      </View>
      <View style={{ flex: 1 }}/>
    </View>
  )
}

export default class HelloWorldApp extends React.Component {
  constructor () {
    // message:
    //   speaker: Enumerize self / target
    //   content: String
    super()
    // let messages = []
    // for (let i = 0 ; i < 10 ; i += 1) {
    //   messages = messages.concat([{
    //     speaker: "self",
    //     content: "你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界"
    //   },{
    //     speaker: "target",
    //     content: "hello world"
    //   }])
    // }
    this.state = {
      messages: [{
        speaker: "target",
        content: "你有什么想对我说的吗？"
      }],
      current_message: "",
      initialized: false,
    }
  }

  componentDidMount () {
    Keyboard.addListener('keyboardDidChangeFrame', () => {
      this.scrollToBottom(false)
    })

    setTimeout(() => {
      this.scrollToBottom(false)
      this.setState({
        initialized: true
      })
    }, 100)
  }

  onChangeText = current_message => {
    this.setState({
      current_message
    })
  }

  onSubmitEditing = () => {
    if (this.state.current_message !== "") {
      this.sendMessage(this.state.current_message)
      this.setState({
        current_message: ""
      })
    }
  }

  scrollToBottom = (animated = true) => {
    this.refs.message_box.scrollToEnd({animated})
  }

  sendMessage (content) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          speaker: "self",
          content
        }
      ]
    }, () => {
      this.scrollToBottom()
    })

    fetch('http://love-mango.com/speak_to_robot', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: content
      })
    }).then(response => response.json())
      .then(json => {
        this.receiveMessage(json.message)
      })
  }

  receiveMessage (content) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          speaker: "target",
          content
        }
      ]
    }, () => {
      this.scrollToBottom()
    })
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <StatusBar
          hidden={true}
        >
        </StatusBar>
        <Header />
        <View style={styles.body}>
          <FlatList
            ref="message_box"
            style={{ backgroundColor: '#EEEEEE', flex: 1, opacity: this.state.initialized ? 1 : 0}}
            data={this.state.messages}
            renderItem= {({item}) => <MessageItem message={item} />}
            keyExtractor= {(item, index) => index}
          />
          <View style={styles.input_container}>
            <TextInput
              value={this.state.current_message}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEditing}
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="send"
              blurOnSubmit={false}
            />
          </View>
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#333',
    alignItems: 'center',
  },
  header_text: {
    lineHeight: 50,
    color: "white",
    fontSize: 18,
    fontFamily: "PingFangSC-Regular",
  },
  body: {
    flex: 1,
  },
  message: {
    paddingVertical: 10
  },
  input_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 4,
    padding: 5,
    height: 40
  }
});

function a () {
  /*
    <View style={styles.container}>
      <View style={{height: 20}} />
      <View style={{backgroundColor: "red"}}>
        <Text style={{backgroundColor: "blue", height: 20, maxWidth: 60}}>
          aaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Text>
        <Text style={{backgroundColor: "green", height: 20}}>
          {
            this.state.language
          }
        </Text>
      </View>
      <TextInput
        style={{ borderWidth: 1, borderStyle: "solid", borderColor: "green", paddingLeft: 20}}
        value={this.state.text}
        onChangeText={this.changeTextHandler}
      />
      <View style={{alignItems: 'center', opacity: 0.8}}>
        <TouchableOpacity
          onPress={this.pressHandler}
          onLongPress={this.longPressHandler}
          title="just press"
        >
          <View style={{borderWidth: 1, borderStyle: "solid", borderColor: '#841584', justifyContent: 'center', height: 50, width: 200, borderRadius: 10}}>
            <Text style={{textAlign: 'center'}}>
              Opactiy Button
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={this.state.language}
        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
        style={{backgroundColor: 'pink'}}>
        <Picker.Item label="zh" value="zh" />
        <Picker.Item label="en" value="en" />
      </Picker>
      <View style={{flex: 1, backgroundColor: "gray"}}/>
      <ScrollView style={{maxHeight: 100}}>
        <Text style={{flex: 1, backgroundColor: "yellow", textAlign: "center", justifyContent: "center", lineHeight: 50}}>
          Footer
        </Text>
      </ScrollView>
    </View>
    */
}
