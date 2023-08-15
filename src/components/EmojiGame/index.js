/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

import './index.css'
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

class EmojiGame extends Component {
  state = {
    tempClickedEmojisList: [],
    isWinOrLoseCardActive: false,
    topScore: [-1],
  }

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  onClickEmoji = uniqueId => {
    const {emojisList} = this.props
    const {tempClickedEmojisList} = this.state
    const clickedEmoji = emojisList.find(
      emojiDetails => emojiDetails.id === uniqueId,
    )
    if (!tempClickedEmojisList.includes(clickedEmoji.id)) {
      const updatedClickedEmojisList = [
        ...tempClickedEmojisList,
        clickedEmoji.id,
      ]
      this.setState({
        tempClickedEmojisList: updatedClickedEmojisList,
      })
      if (updatedClickedEmojisList.length === 12) {
        this.setState({
          isWinOrLoseCardActive: true,
        })
      }
    } else {
      this.setState({
        isWinOrLoseCardActive: true,
      })
    }
  }

  playAgainOption = () => {
    this.setState(prevState => ({
      isWinOrLoseCardActive: !prevState.isWinOrLoseCardActive,
      topScore: [
        ...prevState.topScore,
        prevState.tempClickedEmojisList.length - 1,
      ],
      tempClickedEmojisList: [],
    }))
  }

  render() {
    const {emojisList} = this.props
    const {isWinOrLoseCardActive, tempClickedEmojisList, topScore} = this.state
    this.shuffledEmojisList()
    return (
      <div className="emoji-game-container">
        <NavBar
          tempClickedEmojisList={tempClickedEmojisList}
          isWinOrLoseCardActive={isWinOrLoseCardActive}
          topScore={topScore}
        />
        {isWinOrLoseCardActive ? (
          <WinOrLoseCard
            playAgainOption={this.playAgainOption}
            tempClickedEmojisList={tempClickedEmojisList}
          />
        ) : (
          <ul className="Emoji-Card-container">
            {emojisList.map(eachCard => (
              <EmojiCard
                key={eachCard.id}
                cardDetails={eachCard}
                onClickEmoji={this.onClickEmoji}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default EmojiGame
