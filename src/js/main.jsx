import React from 'react';
import ReactDOM from 'react-dom';
import '../css/main';


const GiftSection = React.createClass({
	getInitialState() {
		return {
			productList: [],
			allProduct: []
		}
	}, 
	handleFilterUpdate(catName) {
		console.log("CatName",catName);

		if(catName == "all") {
			this.setState({
			productList: this.state.allProduct
			})
			return;
		}
		const filteredValue = this.state.allProduct.filter((obj) => {
			console.log(catDir(obj.categories));
			return catDir(obj.categories) == catName && obj.brand_order != 0;
		})
		console.log(filteredValue.length);
		this.setState({
			productList: filteredValue,
		})
	},
	componentDidMount() {
    const myHeader = new Headers({
      credentials: 'include',
      mode: 'cors',
    });
    const config = {
      headers: myHeader,
    }
    const url = '/api/products';
    const component = this;
    fetch(url, config).then((resp) => {
      let json = resp.json();
      if (resp.status >= 200 && resp.status < 300) {
        return json;
      } else {
        // console.log(resp.status);
        return;
      }
    }).then((json) => {

    	
    	component.setState({
    	 "productList": json.data ,
    	 "allProduct": json.data 
    	});
    })
  },
  render() {
    return (<div>
				<GiftCatFilter update={this.handleFilterUpdate}></GiftCatFilter>
				<ImgGrid productList={this.state.productList}></ImgGrid>
			</div>)
  }
})
const GiftCatFilter = React.createClass({
  render() {
    const giftCatList = ['all', 'easybreezy', 'sweetheart', 'wildsexy', 'urbansporty', 'coolstylish'];
    const CatBar = giftCatList.map((catName) => {
      return <div onClick={() => this.handleClick(catName)} className="click" key={catName}>{catName}</div>;
    });
    return (<div className="gift-cat-bar">
					{CatBar}
				</div>);
  },
  handleClick(catName) {
  	console.log(catName);
  	this.props.update(catName);

  }
})
const ImgGrid = React.createClass({
  
  render() {
    const item = this.props.productList
    .sort((a, b) => {
    	return (a.is_client.toLowerCase() == "yes") - (a.is_client.toLowerCase() == "yes") || Number(a.brand_order + a.product_order) - Number(b.brand_order + b.product_order);
    })
    .reverse()
    .map((obj, idx) => {
      return <ProductBox key={idx} item={obj}></ProductBox>
    });
    return (<div>
			{item}
		</div>)
  }
})

const catDir = (catName) => {
	return catName.replace("&", "").replace(/\s/g, "").toLowerCase();
};


const ProductBox = React.createClass({
  render() {
    return (<img src={['images', 'products', 'thumb', catDir(this.props.item.categories), this.props.item.retouchedName].join("/")
} alt=""/>)
  }
})

ReactDOM.render(<GiftSection></GiftSection>, document.getElementById('root'));
