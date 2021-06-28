import React from 'react';
const randomColor = require('randomcolor'); // import the script

export default class Meme extends React.Component {
    constructor(){
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'https://i.imgflip.com/4/30b1gx.jpg',
            randomColor: randomColor(),
            MemeImages: []
        }
    }

    componentDidMount =()=> {
        fetch('https://api.imgflip.com/get_memes')
        .then(response=> response.json())
        .then(response => {
            this.setState({
                MemeImages: response.data.memes
            })
        })
    }

    handleChange = (event) =>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event)=> {
        event.preventDefault();
        let random = ()=> Math.floor(Math.random() * this.state.MemeImages.length)
        this.setState({
            randomImage: this.state.MemeImages[random()].url,
            randomColor: randomColor()
        })
        //randomColor()
    }

    render(){        
        const {topText,bottomText,randomImage,randomColor} = this.state
        return(
            <div style={{backgroundColor:randomColor}}>
            <div className='meme-container'>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder='top text' onChange={this.handleChange} name='topText' value={topText} type="text" />
                    <input placeholder='bottom text' onChange={this.handleChange} name='bottomText' value={bottomText} type="text" />
                    <button type='submit'>Generate Meme</button>
                </form>
                <div className="meme">
                    <p className='para-top'>{topText}</p>
                    <img src={randomImage} />
                    <p className='para-bottom'>{bottomText}</p>
                </div>
            </div>
            </div>
        )
    }
}