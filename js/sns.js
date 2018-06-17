var productList = React.createClass({
      getInitialState(){
        return {
            products : []
        }
      },
      componentWillMount() { alert('Suraj');
		  var url="http://52.163.118.40/gofynd/search?query=";
         fetch(url)
		 .then(results => results.json())
		 .then(array => array[0])
		 .then(text => text.split('. '))
		 .then(array => array.forEach(
		     sentence => this.add(sentence)
		 ))
		 .catch(function(err){
			 console.log("Didn't connect to the API", err);
		 })
      },
	  add(txt){
		console.log(txt);  
	  },
      render(){
        return(
          <div keys={this.state.products}>{this.state.products}</div>
        )
      }

})

ReactDOM.render(
    <productList />,
    document.getElementById('porduct-list')
  );
