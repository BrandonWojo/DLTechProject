import React, { useState } from 'react';
import '../views/Simulation/Simulation.css';

const SimNodeInfo = (props) => {

    if(props.selected > -1){
        let transactions = props.nodes[props.selected].ledger.map(transaction => {
            return <p key={transaction}>{transaction}</p>;
        });
        if(props.nodes[props.selected].drone){
            return (
                <div>
                    <h2>Drone ID:{props.nodes[props.selected].id}</h2>
                    <h3>x: {props.nodes[props.selected].x}</h3>
                    <h3>y: {props.nodes[props.selected].y}</h3>
                    <h3>velocity: {props.nodes[props.selected].velocity}</h3>
                    <h3>rot: {props.nodes[props.selected].rot}deg</h3>
                    <h3>Ledger:</h3>
                    {transactions}
                </div>
            );
        }else{
            return (
                <div>
                    <h2>Base ID:{props.nodes[props.selected].id}</h2>
                    <h3>x: {props.nodes[props.selected].x}</h3>
                    <h3>y: {props.nodes[props.selected].y}</h3>
                    <h3>Ledger:</h3>
                    {transactions}
                </div>
            );
        }
    }else{
        return <div></div>
    }
}

export default SimNodeInfo;