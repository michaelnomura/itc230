<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Albums</title>
        <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    </head>
    <body>

    <!-- We will put our React component inside this div. -->
    <div id="album_container"></div>
    <div id="root"></div>



    <!-- Load our React component. -->
    <script type="text/babel">
        class AlbumApp extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    items: {{{albums}}},
                    curItem: {}
                };
                //this.onSearchChange = this.onSearchChange.bind(this);
                this.onChange = this.onChange.bind(this);
                this.onSave = this.onSave.bind(this);
                this.onDelete = this.onDelete.bind(this);
                //this.onClear = this.onClear.bind(this);
            }
            
            //handle changes to search form
            onSearchChange(event) {
                //set search term
                this.setState({filter: even.target.value.toLowerCase() });
            }
            
            //shoe item details
            showDetails(event){
                let editItem = this.state.items.find((item) => {
                    return item._id == event.target.id;
                });
                this.setState({curItem: editItem});
            }
            //clear details
            onClear() {
                this.setState({curItem: {}});
            }
            onChange(event) {
                //console.log(event);
                var newItem = this.state.curItem;
                newItem[event.target.name] =event.target.value
                this.setState({curItem: newItem});
            }
            
            onSave() {
                let newItem = this.state.curItem;
                console.log(this.state.curItem);
                if (!newItem.title) {
                    return;
                }
                
                fetch("/api/v1/new_album", {
                    method: "POST",
        	           headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem)
                    }).then(res => res.json())
        	       .then((json) => {
                      let newData;
                        if (!newItem._id) { // add new item to array
                            newData = this.state.items;
                            newItem._id = json._id;
                            newData.push(newItem);
                        } else { // update existing item 
                            newData = this.state.items.map((item) => {
                                if (item._id === newItem._id) {
                                    item = newItem; 
                                }
                        return item;
                        });          
                        }
                              // Update state with new array
                    this.setState({items: newData});
                    });
                }
            onDelete(){
                let title = this.state.curItem.title;
                fetch("/api/v1/album/delete/" + title).then((response) => {
                    return response.json();
                }).then((results) => {
                // Filter all items except the one to be removed
                    const remainder = this.state.items.filter((item) => {
                    return item.title !== title;
                });
                // Update state with new array
                this.setState({items: remainder, curItem: {}});
                });
                }
            render(){
            return(
                <div>
                <Title title="Store" />
                <ItemList 
                    items={this.state.items}
                    show={this.showDetails.bind(this)}
                />
                <ItemDetails item={this.state.curItem} onChange={this.onChange} save={this.onSave} delete={this.onDelete}/>
                </div>
            );
        }
    }
    
    //UI elements
    const Title = ({title}) => {
        return (
        <div><h2>{title}</h2></div>
        );
    }
    
    const ItemList = ({items,show}) => {
        let fulllist = items.map((item) => {
            return <li id={item._id} key={item._id} onClick={show}>{item.title}</li>
        });
        
        //console.log(fulllist);
                      
        return (
            <ul>{fulllist}</ul>
        )
    }
    
    const ItemDetails = (props) => {
        return (
          <span>
            <h3>Details:</h3>
                <form>
                    <input type="text" name="title" placeholder="title" onChange={props.onChange} value={props.item.title || ""} /><p/>
                    <input type="text" name="author" placeholder="author" onChange={props.onChange} value={props.item.author || ""} /><p/>
                    <input type="number" name="year" placeholder="year" onChange={props.onChange} value={props.item.year || ""} /><p/>
                </form>
                <button onClick={props.save}>Save</button>
                <button onClick={props.reset}>Reset</button>
                <button onClick={props.delete}>Delete</button>
          </span>
        );
    }
    
    ReactDOM.render(<AlbumApp />, document.getElementById('root'));
    
    </script>

  </body>
</html>