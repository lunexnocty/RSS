import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

type InputProps = {
    label: string
    onChange(text: string): void
}

type InputLabelAnimation = {
    fontSize: Animated.Value
    color: Animated.Value;
    translate: Animated.Value;
}

type InputState = {
    focus: boolean,
    text?: string
}

const InputRow = styled.View`
  margin: 10px;
  position: relative;
`

const InputLabel = styled.Text`
  position: absolute;
  padding: 5px;
  left: 0;
  top: 0;
`
const AnimatedInputLabel = Animated.createAnimatedComponent(InputLabel)
const InputField = styled.TextInput<InputState>`
  font-size: 24;
  border-bottom-width: 2px; 
  border-bottom-color: ${props => props.focus ? 'skyblue' : '#ccc'};
  padding: 5px;
`

export default class Input extends React.Component<InputProps, InputState>{
    private animation: InputLabelAnimation;

    constructor(props: InputProps) {
      super(props)
      this.state = {
        focus: false,
        text: '',

      }
      this.animation = {
        fontSize: new Animated.Value(0),
        color: new Animated.Value(0),
        translate: new Animated.Value(0)
      }
    }

    onFocus = () => {
      Animated.parallel([
        Animated.timing(this.animation.fontSize, {
          toValue: 200,
          duration: 300
        }),
        Animated.timing(this.animation.color, {
          toValue: 200,
          duration: 300
        }),
        Animated.timing(this.animation.translate, {
          toValue: -20,
          duration: 300
        }),
      ]).start()

      this.setState({ focus: true })
    }

    onBlur = () => {
      Animated.parallel([
        Animated.timing(this.animation.fontSize, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.animation.color, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.animation.translate, {
          toValue: 0,
          duration: 300
        }),
      ]).start()
      this.setState({ focus: false })
    }

    onChange = (text: string) => {
      this.setState({ text })
      this.props.onChange(text)
    }

    render() {
      const animated = {
        fontSize: this.animation.fontSize.interpolate({
          inputRange: [0, 200],
          outputRange: [24, 16]
        }),
        color: this.animation.color.interpolate({
          inputRange: [0, 200],
          outputRange: ['#ccc', '#000']
        }),
        transform: [
          { translateY: this.animation.translate }
        ]
      }
      const displayLabel = (!this.state.text) || this.state.focus
      return (
        <InputRow>
          <InputField
            focus={this.state.focus}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChange}
          />

          {displayLabel && (
            <AnimatedInputLabel
              style={animated}
            >
              {this.props.label}
            </AnimatedInputLabel>
          )}
        </InputRow>)
    }

}