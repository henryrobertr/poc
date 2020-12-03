import React,{ Component } from 'react';

import { withRouter } from "react-router";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

import Skeleton from '@material-ui/lab/Skeleton';

import { connect } from 'react-redux';
import { fetchProducts } from './redux';

export class ProductDetails extends Component {
  state = { pageNo: 0,pKey: 0 };

  componentDidMount() {
    let { pageId, pKey } = this.props.match.params;
    this.setState({ pageNo: pageId, pKey: pKey },() => {
      this.updateProductList(this.setState.pageNo);
    });
  }

  updateProductList = (pageNo) => this.props.fetchProducts(pageNo);

  render() {
    return (
      <>
      { 
        this.props.prods ? 
        <div className="outerWrapper">
          <button onClick={() => window.history.back() }>Go Back</button>
          <Card style={{width:"1100px",margin:"0 auto"}}>
            <CardMedia
              component="img"
              alt={this.props.prods[this.state.pKey].productName}
              style={{height:"140px",width:"100%"}}
              image={`https://dummyimage.com/400x1100/e6e6e6/000000.jpg&text=${this.props.prods[this.state.pKey].productName.replace(/[^a-zA-Z ]/g, "")}`}
              title={this.props.prods[this.state.pKey].productName} 
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.prods[this.state.pKey].productName} 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{__html: (this.props.prods[this.state.pKey].longDescription || this.props.prods[this.state.pKey].shortDescription) }}></Typography>
              <Rating size="small" name="half-rating-read" defaultValue={this.props.prods[this.state.pKey].reviewRating} readOnly /><span>({this.props.prods[this.state.pKey].reviewCount})</span> 
              <span style={{paddingLeft:"10px"}}>{this.props.prods[this.state.pKey].inStock ? "In Stock" : "Out of Stock"}</span>
            </CardContent>
          </Card>
        </div>
        :
        <Card style={{width:"1100px",margin:"0 auto"}}>
          <Skeleton animation="wave" variant="rect" style={{height:"140px",width:"100%"}} />
          <CardContent>
            <Skeleton animation="wave" variant="rect" style={{height:"30px",width:"50%",marginBottom: 6}}/>
            <Skeleton animation="wave" variant="rect" style={{height:"20px",width:"40%",marginBottom: 6}}/>
            <Skeleton animation="wave" variant="rect" style={{height:"20px",width:"30%",marginBottom: 6}}/>
            <Skeleton animation="wave" variant="rect" style={{height:"20px",width:"20%",marginBottom: 6}}/>
          </CardContent>
        </Card>
      }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  let { products, pageNumber, pageSize, totalProducts } = state.products;
  return ({ prods: products, curPage: pageNumber, totPage: Math.round((totalProducts||60)/pageSize) });
};

const mapDispatchToProps = { fetchProducts };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

// export default ((withStyles(styles, { withTheme: true })(AppContainer))(withRouter(AppContainer)));
export default (withRouter(AppContainer));