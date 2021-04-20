import React, { Component } from 'react';
import SimNodeInfo from '../../components/SimNodeInfo';
import axios from 'axios';
import './Simulation.css';

class Simulation extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.droneImage = new Image();
    this.homeImage = new Image();
    this.ppImage = new Image();
    this.state = {
      selected: -1,
      nodes: [
        {id: 0, drone: true, x:.5, y:.75, rot:25, velocity:.55, ledger:['Transaction 1','Transaction 2','Transaction 3']},
        {id: 1, drone: false, x:.20, y:.50, rot:36, velocity:.2, ledger:['Transaction 1','Transaction 2','Transaction 3']},
        {id: 2, drone: true, x:.50, y:.10, rot:170, velocity:.4, ledger:['Transaction 1','Transaction 2','Transaction 3']}
      ],
    };
  }

  draw = () => {
    const ctx = this.canvasRef.getContext("2d");
    ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    ctx.drawImage(this.ppImage,0,0);
    for(let i = 0; i < this.state.nodes.length; i++){
      let node = this.state.nodes[i];
      if(node.drone){
        ctx.save();
        ctx.translate(node.x*this.canvasRef.width,node.y*this.canvasRef.height);
        ctx.rotate(node.rot*Math.PI/180);
        ctx.drawImage(this.droneImage,-this.droneImage.width/2,-this.droneImage.height/2);
        ctx.restore();
      }else{
        ctx.save();
        ctx.translate(node.x*this.canvasRef.width,node.y*this.canvasRef.height);
        ctx.drawImage(this.homeImage,-this.homeImage.width/2,-this.homeImage.height/2);
        ctx.restore();
      }
    }
  }

  setSelected = (newSelect) => {
    this.setState({
      selected: newSelect,
      nodes: this.state.nodes,
    });
  }

  setNodes = (newNodes) => {
    this.setState({
      selected: this.state.selected,
      nodes: newNodes,
    });
  }

  componentDidMount() {
    this.droneImage.src = './drone.png';
    this.homeImage.src = './home.png';
    this.ppImage.src = "./playpause.png";
    this.timerID = setInterval(
      () => this.poll(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onCanvasClick = (event) => {
    event.preventDefault();
    var rect = this.canvasRef.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log(x);
    console.log(y);
    
    if(x <= 50 && y <= 50){
      axios.post('http://localhost:5000/api/control', "toggle").then(res => {

      }).catch(e => {
        console.log(`Failed to post settings ${e}`);
      }).finally(() =>{

      });
    }else{
      let vals = this.state.nodes.map((node) => {
        return {id:node.id, val:Math.sqrt(Math.pow(node.x*this.canvasRef.width-x,2)+Math.pow(node.y*this.canvasRef.height-y,2))};
      });
      console.log(vals);
      let least = 0;
      for(let i = 0; i < vals.length; i++){
        if(vals[i].val <= 25 && vals[i].val < vals[least].val){
          least = i;
        }
      }
      if(vals[least].val <= 25){
        this.setSelected(vals[least].id);
        console.log(this.state.selected);
      }
    }
  }

  poll() {
    axios.get('http://localhost:5000/api/nodes').then(res => {
      this.setNodes(res.data);
    }).catch(e => {
      console.log(`Failed to get nodes ${e}`);
    }).finally(() =>{
      this.draw();
    });
  }

  render() {
    let style = {border: "1px solid #000000"};
    return (
      <div>
        <canvas ref={(el) => this.canvasRef = el} onClick={this.onCanvasClick} width={window.innerWidth} height={window.innerHeight} style={style}/>
        <SimNodeInfo nodes={this.state.nodes} selected={this.state.selected}/>
      </div>
    );
  }
}

export default Simulation;