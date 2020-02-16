import React, { Component } from 'react';
// import { Card, Button } from 'semantic-ui-react';
import { Button, Divider, Form, Grid, Segment, Header, Icon, Search, Menu } from 'semantic-ui-react'
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import { Link, Router } from '../routes';
import Fund from '../ethereum/fund'
import Graph from "react-graph-vis";

class FundManagerIndex extends Component {
	state={
        loading:true,
        nodes:[],
        edges:[],
        options:{},
		events:{},
		flag:false,
		node:'',
		flag1:false,
		loadingButton: false
	};

	static async getInitialProps(){
        let color = ["#e04141","#e09c41","#e0df41","#7be041","#41e0c9"]
        let finalNodes = []
        finalNodes.push({id:0x2152CD8b7CFEF975fb498cB2eF6aaf97185c45f6,label:'Factory ',color:color[finalNodes.length%5]})
        let tempNodes = []
        tempNodes.push(0x2152CD8b7CFEF975fb498cB2eF6aaf97185c45f6)
        let finalEdges =[]
        const rootNodes = await factory.methods.getDeployedRoots().call()
        rootNodes.map(address => {
            finalEdges.push({from:tempNodes[0],to:address})
            finalNodes.push({id:address,label:'Node '+finalNodes.length,color:color[finalNodes.length%5]})
            tempNodes.push(address)
        })
        tempNodes.shift()
        return {rootNodes ,color,finalEdges,finalNodes,tempNodes}
	}
	renderNodeInfo  (node){
		this.setState({flag:true,node:node})
		
	}
	renderNodesInfo (nodes){
		this.setState({flag1:true,nodes:nodes})
		
	}
	async componentDidMount(){
        
        const options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            }
        };

		const events = {
            click: function (event) {
                var { nodes, edges } = event;
                console.log("Selected nodes$$$:");
                // this.setState({selectedNode:nodes,selectedEdge:edges})
                console.log(nodes);
                console.log("Selected edges***:");
				console.log(edges);
				this.renderNodesInfo(nodes)
			},
			hoverNode:function(node){
				console.log("$$$$"+node)
				this.renderNodeInfo(node)
			}
        };
        while(this.props.tempNodes.length)
        {
            const fund = Fund(this.props.tempNodes[0])
            const childNodes = await fund.methods.getChildFunds().call()
            childNodes.map(address => {
                this.props.finalEdges.push({from:this.props.tempNodes[0],to:address})
                this.props.finalNodes.push({id:address,label:'Node '+this.props.finalNodes.length,color:this.props.color[this.props.finalNodes.length%5]})
                this.props.tempNodes.push(address)
            })
            this.props.tempNodes.shift()
            this.setState({nodes:this.props.finalNodes,edges:this.props.finalEdges,options:options,events:events,loading:false})
        }
        
	}
	

renderGraph = ()=>{
    console.log('Heloo')
    const graph1={nodes:this.state.nodes,edges:this.state.edges}
    return <Graph graph={graph1} options={this.state.options} events={this.state.events} style={{ height: "640px" }} />
}

	onClick = () => {
		this.setState({ loadingButton: true })
		Router.pushRoute('/factory/rootFund');
	}

	render() {
		
		return (
			<Layout>
				<Segment placeholder raised style={{ marginTop: 50 }}>
					<Grid columns={2} stackable textAlign='center'>
						<Divider vertical> => </Divider>

						<Grid.Row verticalAlign='middle'>
							<Grid.Column>
								<Header icon>
									<Icon name='factory' />
										Factory Functionalities
				          		</Header>
								<Link route='/factory/rootFund'>
									<a>
										<Button 
											primary
											content='Enter'
											loading={this.state.loadingButton}
											onClick={this.onClick}
										/>
									</a>
								</Link>
							</Grid.Column>

							<Grid.Column>
								<div>{!this.state.loading?this.renderGraph():''}</div>
								<br />
								<div>{this.state.flag?this.state.node:''}</div>
								<div>{this.state.flag1?this.state.nodes:''}</div>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
				
			</Layout>
		);


	}
}
export default FundManagerIndex;
	