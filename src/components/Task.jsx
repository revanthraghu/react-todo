import React from 'react'
class Task extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            done: false,
            favourite: false,
            edit: false,
            cancel: false,
            input: this.props.task
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e) {
        this.setState({input: e.target.value})
    }

    handleClick(e) {
        let name = e.target.name || e.target.parentElement.name
        if(this.state.done === false && this.props.done === false) {
            this.setState(prevState => {
                let newState = !prevState[name]
                if((name === "edit" && newState === false) || (name === "cancel" && newState === true) || (name === "done") || (name === "favourite")) {
                    this.props.updateData(this.props.id, this.state.input, name)
                }
                return ({[name]: newState})
            })
        }
        else {
            if(name === "done" || name === "cancel") {
                this.setState(prevState => {
                    let newState = !prevState[name]
                    this.props.updateData(this.props.id, this.state.input, name, this.state.done, this.state.cancel)
                    return ({[name]: newState})
                })
            }
        }
    }

    render() {
        return (
            <div style={ this.props.done === true ? {position: "relative", display: "flex", width: "350px", border: "1px solid rgb(180,180,180)", borderRadius: "4px", backgroundColor: "hsla(120, 50%, 50%, 0.5)", height: "max-content", padding: "10px", marginBottom: "15px" } : {position: "relative", display: "flex", width: "350px", border: "1px solid rgb(180,180,180)", borderRadius: "4px", backgroundColor: "white", height: "max-content", padding: "10px", marginBottom: "15px" }}>
                <button name="done" onClick={this.handleClick} style={{alignSelf: "start", color: "green", fontSize: "26px", cursor: "pointer", background: "transparent", border: "none"}}>
                    <i className={this.state.done === true || this.props.done === true ? "fas fa-check-square":"fal fa-square"}></i>
                </button>
                {this.state.edit === true? <textarea onChange={this.handleChange} value={this.state.input} type="text" style={{border: "none", minWidth: "214px", maxWidth: "214px", margin: "0 10px", alignSelf: "center", fontSize: "18px", height: "max-content"}}/> : <div style={{flex: "1", overflowWrap: "anywhere", padding: "0 10px", alignSelf: "center", fontSize: "18px"}}>{this.props.done === true ? <s>{this.state.input}</s> : this.state.input}</div>}
                <button disabled={this.props.done} name="favourite" onClick={this.handleClick} style={{alignSelf: "start", color: this.props.done === true ? "black": "orange", fontSize: "22px", cursor: "pointer", background: "transparent", border: "none"}}>
                    <i name="favourite" className={this.state.favourite===true || this.props.favourite === true? "fas fa-star" : "fal fa-star"}/>
                </button>
                <button disabled={this.props.done} title={this.state.edit===true?"Save":"Edit"} name="edit" onClick={this.handleClick} style={{alignSelf: "start", color: this.props.done === true ? "black": "green", fontSize: "20px", padding: "0 10px", paddingTop: "0.1em", cursor: "pointer", background: "transparent", border: "none"}}>
                    <i className={this.state.edit===true?"far fa-check":"fas fa-pencil"}></i>
                </button>
                <button title="Delete" name="cancel" onClick={this.handleClick} style={{paddingTop: "0.2em", alignSelf: "start", color: this.props.done === true ? "black": "red", cursor: "pointer", background: "transparent", border: "none"}}>
                    <i style={{fontSize: "26px"}} className="fal fa-times"/>
                </button>
            </div>
        )
    }
}

export default Task