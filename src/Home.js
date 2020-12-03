import React,{ Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from './redux';

/* Styles */
const styles = (theme) => ({
  root : {
    maxWidth: 1100,
    margin : "0 auto",
  },
  plOuter : {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: 345,
    marginBottom : "20px"
  },
  cardHeader : {
    height : "70px",
    overflow : "hidden",
    alignItems : "start",
    textOverflow: "ellipsis",
    "display": "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  },
  cardHeaderLink : {
    textDecoration:"none",
    color:"#000000",
    "&:hover" : {
      textDecoration:"underline",
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  btm : {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "10px",
    fontSize: "18px"
  },
  pgn : {
    margin : '30px 0 30px 0',
  }
});

export class App extends Component {
  //Setting default pageNo
  state = { pageNo: 1 };

  componentDidMount() {
    this.updateProductList(this.state.pageNo);
  }

  //Update Product List
  updateProductList = (pageNo) => this.props.fetchProducts(pageNo);

  render() {
    /* Props */
    const { classes, totPage, curPage } = this.props;
    return (
      <>
      { this.props.prods ?
      <div className={classes.root}> 
        <div className={classes.plOuter}>
          {
            this.props.prods.map((pData,index) => {
              return(
                <Card key={pData.productId} className={classes.card}>
                  <CardHeader 
                    classes={{
                      title: classes.cardHeader
                    }} 
                    title={	<Link to={`/productdetails/${pData.productId}/${curPage}/${index}`} className={classes.cardHeaderLink}>{pData.productName}</Link> }
                    subheader={pData.price}
                  />
                  <CardMedia
                    className={classes.media}
                    image={`https://dummyimage.com/400x400/e6e6e6/000000.jpg&text=${pData.productName.replace(/[^a-zA-Z ]/g, "")}`}
                    title={pData.productName} 
                  />
                  <div className={classes.btm}>
                    <div><Rating size="small" name="half-rating-read" defaultValue={pData.reviewRating} readOnly /><span>({pData.reviewCount})</span></div>
                    <div style={{paddingLeft:"10px"}}>{pData.inStock ? "In Stock" : "Out of Stock"}</div>
                  </div>
                </Card>
              )
            })
          }
        </div>
        {/* Pagination */}
        <Pagination className={classes.pgn} count={totPage} page={curPage} onChange={(event, value) => this.updateProductList(value)} />
      </div>
       :
       /* Skeleton */
        <div className={classes.root}> 
          <div className={classes.plOuter}> 
            <Card className={classes.card}>
              <CardHeader 
                title={<Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />}
                subheader={<Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 6 }} />}
              />
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            </Card>
            <Card className={classes.card}>
              <CardHeader 
                title={<Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />}
                subheader={<Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 6 }} />}
              />
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            </Card>
            <Card className={classes.card}>
              <CardHeader 
                title={<Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />}
                subheader={<Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 6 }} />}
              />
              <Skeleton animation="wave" variant="rect" className={classes.media} />
            </Card>
          </div>
        </div>
       }
       </>
    );
  }
}

const mapStateToProps = (state) => {
  let { products, pageNumber, pageSize, totalProducts } = state.products;
  return ({ prods: products, curPage: pageNumber, totPage: Math.round((totalProducts||60)/pageSize) });
};
const mapDispatchToProps = { fetchProducts };
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default withStyles(styles, { withTheme: true })(AppContainer);
