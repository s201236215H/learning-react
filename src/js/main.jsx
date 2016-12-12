import React from 'react';
import ReactDOM from 'react-dom';
import '../css/main';
const GiftSection = React.createClass({
  render() {
    return (<div>
				<GiftCatFilter></GiftCatFilter>
				<ImgGrid></ImgGrid>
			</div>)
  }
})
const GiftCatFilter = React.createClass({
  render() {
    const giftCatList = ['all', 'easybreezy', 'sweetheart', 'wildsexy', 'urbansporty', 'coolstylish'];
    const CatBar = giftCatList.map((catName) => {
      return <div onClick={() => this.handleClick} className="inline-block" key={catName}>{catName}</div>;
    });
    return (<div className="gift-cat-bar">
					{CatBar}
				</div>);
  },
  handleClick(e) {}
})
const ImgGrid = React.createClass({
  getInitialState() {
    return { "productList": [] };
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
        console.log(resp.status);
        return;
      }
    }).then(function (json) {

    	console.log('json',component.state.productList);
    	component.setState({ "productList": json.data });
    })
  },
  render() {
    const item = this.state.productList.map((obj, idx) => {
      return <ProductBox key={idx} item={obj}></ProductBox>
    });
    console.log('ProductList',this.state.productList);
    return (<div>
			{item}
		</div>)
  }
})
const ProductBox = React.createClass({
  render() {
  	console.log(this.props.item);
    return (<img src={"images/products/thumb/"+this.props.item.retouchedName} alt=""/>)
  }
})
ReactDOM.render(<GiftSection></GiftSection>, document.getElementById('root'));
