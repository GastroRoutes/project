(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{159:function(e,t,a){e.exports=a(392)},164:function(e,t,a){},166:function(e,t,a){},187:function(e,t,a){},192:function(e,t,a){},389:function(e){e.exports=[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",elementType:"labels",stylers:[{visibility:"simplified"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{lightness:"17"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"landscape",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"simplified"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"},{color:"#ff4700"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.highway",elementType:"labels",stylers:[{invert_lightness:!0},{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.fill",stylers:[{color:"#3b3b3b"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ff4700"},{lightness:"39"},{gamma:"0.43"},{saturation:"-47"}]},{featureType:"road.arterial",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{color:"#555555"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}]},390:function(e,t,a){},392:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(68),o=a.n(l),s=(a(164),a(2)),i=a(3),u=a(4),c=a(6),m=a(5),p=a(7),h=(a(166),n.Component,a(22)),f=a.n(h),y=function e(){var t=this;Object(i.a)(this,e),this.signup=function(e){var a=new FormData;return Object.keys(e).forEach(function(t){return a.append(t,e[t])}),t.service.post("/signup",a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){return e.data})},this.login=function(e){return t.service.post("/login",e).then(function(e){return e.data})},this.loggedin=function(){return t.service.get("/loggedin").then(function(e){return e.data})},this.logout=function(){return t.service.get("/logout").then(function(e){return e.data})},this.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/auth"),withCredentials:!0})},g=a(397),d=(a(187),a(41)),b=a(395),E=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleFormSubmit=function(t){t.preventDefault();var a=e.state,n=a.username,r=a.email,l=a.password;e.authService.signup({username:n,email:r,password:l}).then(function(t){e.setState({username:"",email:"",password:"",redirect:!0},function(){return e.props.getUser(t)})})},e.handleChange=function(t){var a=t.target,n=a.name,r=a.value;e.setState(Object(s.a)({},e.state,Object(d.a)({},n,r)))},e.state={username:"",email:"",password:"",redirect:!1},e.authService=new y,e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return this.state&&this.state.redirect?r.a.createElement(b.a,{to:"/profile"}):r.a.createElement("div",null,r.a.createElement("h2",null,"Signup"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("label",null,"Nombre de usuario"),r.a.createElement("input",{type:"text",name:"username",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Email"),r.a.createElement("input",{type:"email",name:"email",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Contrase\xf1a"),r.a.createElement("input",{type:"password",name:"password",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit",value:"Signup"})))}}]),t}(n.Component),v=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleFormSubmit=function(t){t.preventDefault();var a=e.state,n=a.username,r=a.password;e.authService.login({username:n,password:r}).then(function(t){e.setState(Object(s.a)({},e.state,{redirect:!0}),function(){e.props.getUser(t)})})},e.handleChange=function(t){var a=t.target,n=a.name,r=a.value;e.setState(Object(d.a)({},n,r))},e.state={username:"",password:"",redirect:!1},e.authService=new y,e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return this.state.redirect?(console.log("entra"),r.a.createElement(b.a,{to:"/profile"})):r.a.createElement("div",null,r.a.createElement("h2",null,"Login"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("label",null,"Username"),r.a.createElement("input",{type:"text",name:"username",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("label",null,"Password"),r.a.createElement("input",{type:"password",name:"password",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit",value:"Login"})))}}]),t}(n.Component),T=a(394),O=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).props.fetchUser(),a.AuthService=new y,a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"No user"),r.a.createElement(g.a,{path:"/signup",render:function(){return r.a.createElement(E,{getUser:e.props.getUser,fetchUser:e.props.fetchUser})}}),r.a.createElement(g.a,{path:"/login",render:function(){return r.a.createElement(v,{getUser:e.props.getUser})}}),r.a.createElement(T.a,{to:"/"},"Home")," -",r.a.createElement(T.a,{to:"/signup"},"Signup")," -"," ",r.a.createElement(T.a,{to:"/login"},"Login"))}}]),t}(n.Component),C=(a(192),a(70)),j=a(26),R=a(19),w=(a(389),Object(j.compose)(Object(j.withProps)({googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places",loadingElement:r.a.createElement("div",{style:{height:"100%"}}),containerElement:r.a.createElement("div",{style:{height:"400px"}}),mapElement:r.a.createElement("div",{style:{height:"100%"}})}),R.withScriptjs,R.withGoogleMap,Object(j.lifecycle)({componentDidMount:function(){var e=this;(new google.maps.DirectionsService).route({origin:new google.maps.LatLng(40.4893538,-3.6827461),destination:new google.maps.LatLng(43.3579649,-5.8733862),travelMode:google.maps.TravelMode.DRIVING,waypoints:[{location:new google.maps.LatLng(42.5735672,-5.5671588)},{location:new google.maps.LatLng(42.3499677,-3.6822051)}]},function(t,a){a===google.maps.DirectionsStatus.OK?e.setState({directions:t}):console.error("error fetching directions ".concat(t))})}}))(function(e){return r.a.createElement(R.GoogleMap,{defaultZoom:7,defaultCenter:{lat:-34.397,lng:150.644},defaultOptions:{styles:[{elementType:"geometry",stylers:[{color:"#212121"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{elementType:"labels.text.stroke",stylers:[{color:"#212121"}]},{featureType:"administrative",elementType:"geometry",stylers:[{color:"#757575"}]},{featureType:"administrative.country",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"administrative.land_parcel",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"poi",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#181818"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"poi.park",elementType:"labels.text.stroke",stylers:[{color:"#1b1b1b"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#2c2c2c"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#8a8a8a"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#373737"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#3c3c3c"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#4e4e4e"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#3d3d3d"}]}]}},e.directions&&r.a.createElement(R.DirectionsRenderer,{directions:e.directions,options:{polylineOptions:{strokeColor:"orange"}}}),r.a.createElement(R.Marker,{position:{lat:-34.397,lng:150.644},onClick:e.onToggleOpen},e.isOpen&&r.a.createElement(R.InfoWindow,{onCloseClick:e.onToggleOpen},r.a.createElement(C.a,null))))})),S=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w,null))}}]),t}(n.Component),k=Object(j.compose)(Object(j.withStateHandlers)(function(){return{isOpen:!1}},{onToggleOpen:function(e){var t=e.isOpen;return function(){return{isOpen:!t}}}}),R.withScriptjs,R.withGoogleMap)(function(e){return r.a.createElement(R.GoogleMap,{defaultZoom:8,defaultCenter:{lat:-34.397,lng:150.644}},r.a.createElement(R.Marker,{position:{lat:-34.397,lng:150.644},onClick:e.onToggleOpen},e.isOpen&&r.a.createElement(R.InfoWindow,{onCloseClick:e.onToggleOpen},r.a.createElement(C.a,null))))}),U=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(k,{googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyB8NzS5RBf23YH2cAwWi8t0HlpwPfqB6no&v=3.exp&libraries=geometry,drawing,places",loadingElement:r.a.createElement("div",{style:{height:"100%"}}),containerElement:r.a.createElement("div",{style:{height:"400px"}}),mapElement:r.a.createElement("div",{style:{height:"100%"}})}))}}]),t}(n.Component),x=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).getUserRoutes=function(){return a.service.get("/").then(function(e){console.log(e.data);var t=e.data.track.createdTrack;return a.setState(Object(s.a)({},a.state,{userRoutes:t})),e}).catch(function(e){return console.log(e)})},a.handleFormSubmit=function(e){e.preventDefault();var t=a.state.createRoutes,n=t.routesName,r=t.category,l=t.routesType;a.getRoute({routesName:n,category:r,routesType:l}).then(function(e){e.data._id;a.props.createRoutes(e.data),a.getUserRoutes()})},a.getRoute=function(e){return a.service.post("/createTrack",e).then(function(e){return e})},a.handleFormSubmitUPDATE=function(e,t){e.preventDefault();var n=a.state.createRoutes,r=n.routesName,l=n.category,o=n.routesType;a.updateRoute({routesName:r,category:l,routesType:o},t).then(function(e){console.log(e.data.routesName),a.getUserRoutes()})},a.handleChangeUPDATE=function(e){var t=e.target,n=t.name,r=t.value,l=a.state.createRoutes;l[n]=r,console.log(l),a.setState(Object(s.a)({},a.state,{createRoutes:l}))},a.updateRoute=function(e,t){return a.service.post("/".concat(t,"/update"),e).then(function(e){return e})},a.deleteRoute=function(e,t){return e.preventDefault(),a.service.post("/".concat(t,"/delete"),t).then(function(e){return a.getUserRoutes(),e})},a.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/tracks"),withCredentials:!0}),a.state={createRoutes:{routesName:"",category:"",routesType:""},userRoutes:[{}],restaurant:null},a.routes=[],a.getUserRoutes(),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state.userRoutes?this.state.userRoutes.map(function(t){return r.a.createElement("div",{style:{border:"1px solid blue"},key:t._id},r.a.createElement("h3",null,"Name: ",t.routesName),r.a.createElement("p",null,"Category: ",t.category," "),r.a.createElement("img",{src:t.image,alt:"image"}),r.a.createElement("form",{onSubmit:function(a){return e.handleFormSubmitUPDATE(a,t._id)}},r.a.createElement("label",null,"Actualizar rutas: "),r.a.createElement("input",{type:"text",name:"routesName",onChange:function(t){return e.handleChangeUPDATE(t)},placeholder:"Nombre de la ruta",autoComplete:"off"}),r.a.createElement("input",{type:"text",name:"category",onChange:function(t){return e.handleChangeUPDATE(t)},placeholder:"Categor\xeda",autoComplete:"off"}),r.a.createElement("input",{type:"text",name:"routesType",onChange:function(t){return e.handleChangeUPDATE(t)},placeholder:"Tipo de ruta",autoComplete:"off"}),r.a.createElement("input",{type:"submit"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:function(a){return e.deleteRoute(a,t._id)}},r.a.createElement("input",{value:"DELETE",type:"submit"})),r.a.createElement("br",null),r.a.createElement("br",null))}):"no hay rutas";return r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("h1",null,"Tus rutas"),r.a.createElement("h3",null,this.state.routesName),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),t,r.a.createElement(S,null),r.a.createElement(U,null))}}]),t}(n.Component),D=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state.restaurant,n=t.term,r=t.location;a.getRestaurants({term:n,location:r}).then(function(e){console.log(e),a.props.getRestaurants(e),a.setState(Object(s.a)({},a.state))})},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value,l=a.state.restaurant;l[n]=r,a.setState(Object(s.a)({},a.state,{restaurant:l}))},a.getRestaurants=function(e,t){return a.service.post("/yelp",{term:e,location:t}).then(function(e){return e.data.map(function(e){return{e:e}})})},a.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/yelp"),withCredentials:!0}),a.state={restaurant:{term:"",location:""}},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){return e.handleFormSubmit(t,e.props.state)}},r.a.createElement("input",{type:"text",name:"term",placeholder:"Buscar restaurantes",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"text",name:"location",placeholder:"Ubicaci\xf3n",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit"})))}}]),t}(n.Component),N=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleFormSubmit=function(t){t.preventDefault();var a=e.state.createRoutes,n=a.routesName,r=a.category,l=a.routesType,o=a.photo;e.getRoute({routesName:n,category:r,routesType:l,photo:o}).then(function(t){console.log(t.data),e.props.createRoutes(t.data),e.setState(Object(s.a)({},e.props.state,{createRoutes:null}))})},e.handleChangeCREATE=function(t){var a=e.state.createRoutes,n=t.target,r=n.name,l=n.value;"photo"===r?(a[r]=t.target.files[0],e.setState(Object(s.a)({},e.state,{newRoute:a})),console.log(e.state.createRoutes)):(a[r]=l,e.setState(Object(s.a)({},e.state,{newRoute:a})))},e.getRoute=function(t){var a=new FormData;return Object.keys(t).forEach(function(e){return a.append(e,t[e])}),e.service.post("/createTrack",a,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){return e})},e.getRestaurants=function(t){e.setState(Object(s.a)({},e.state,{restaurant:t}))},e.state={createRoutes:{routesName:"",category:"",routesType:""},restaurant:null},e.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/tracks"),withCredentials:!0}),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state.restaurant?this.state.restaurant.map(function(e){return r.a.createElement("div",{id:"restaurantContainer"},r.a.createElement("h3",null,e.e.name),r.a.createElement("img",{src:e.e.image_url,alt:"restaurante"}),r.a.createElement("p",null,e.e.location.address1),r.a.createElement("p",null,e.e.price),r.a.createElement("button",null,"A\xf1adir parada"))}):r.a.createElement("h2",null,"No hay restaurantes");return r.a.createElement("div",null,r.a.createElement("hr",null),r.a.createElement("h1",null,"Crear rutas"),r.a.createElement("form",{onSubmit:function(t){return e.handleFormSubmit(t)}},r.a.createElement("input",{type:"text",name:"routesName",onChange:function(t){return e.handleChangeCREATE(t)},placeholder:"Nombre de la ruta",autoComplete:"off"}),r.a.createElement("input",{type:"text",name:"category",onChange:function(t){return e.handleChangeCREATE(t)},placeholder:"Categor\xeda",autoComplete:"off"}),r.a.createElement("input",{type:"text",name:"routesType",onChange:function(t){return e.handleChangeCREATE(t)},placeholder:"Tipo de ruta",autoComplete:"off"}),r.a.createElement("input",{type:"file",name:"photo",onChange:function(t){return e.handleChangeCREATE(t)}}),r.a.createElement("br",null),r.a.createElement("input",{value:"Crear ruta",type:"submit"})),r.a.createElement(D,{getRestaurants:this.getRestaurants,restaurants:this.props.restaurants,handleFormSubmit:this.handleFormSubmit,handleChange:this.handleChange}),r.a.createElement("div",{id:"restaurantsContainer"},t))}}]),t}(n.Component),P=(a(390),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state.user,n=t.username,r=t.email,l=t.photo;a.updateProfile({username:n,email:r,photo:l})},a.handleChange=function(e){var t=Object(s.a)({},a.state.user),n=e.target,r=n.name,l=n.value;"photo"===r?(t[r]=e.target.files[0],a.setState(Object(s.a)({},a.state,{user:t})),console.log(a.state.user)):(t[r]=l,a.setState(Object(s.a)({},a.state,{user:t})))},a.updateProfile=function(e){console.log(e);var t=new FormData;return Object.keys(e).forEach(function(a){return t.append(a,e[a])}),a.service.post("/details",t,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){a.props.getUser(e.data)})},a.createRouteButton=function(){a.state.createRoutesToggle?a.setState(Object(s.a)({},a.state,{createRoutesToggle:null})):a.setState(Object(s.a)({},a.state,{createRoutesToggle:!0})),console.log(a.state.user)},a.createRoutes=function(e){a.setState(Object(s.a)({},a.state,{createRoutesToggle:null}))},a.showUpdateProfileButton=function(){a.state.showUpdateProfileButton?a.setState(Object(s.a)({},a.state,{showUpdateProfileButton:null})):a.setState(Object(s.a)({},a.state,{showUpdateProfileButton:!0}))},a.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/editProfile"),withCredentials:!0}),a.state={user:a.props.user,userRoutes:a.props.user,createRoutesToggle:null,showUpdateProfileButton:null},console.log(a.state.user.savedRoutes),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state.createRoutesToggle?r.a.createElement("div",null,r.a.createElement("button",{onClick:this.createRouteButton},"Tus rutas"),r.a.createElement(N,{createRoutes:this.createRoutes,getRoutes:this.getRoutes,state:this.state})):r.a.createElement("div",null,r.a.createElement("button",{onClick:this.createRouteButton},"Crear Ruta"),r.a.createElement(x,{userRoutes:this.userRoutes,createRoutes:this.props.createRoutes,handleFormSubmit:this.handleFormSubmit,handleChange:this.handleChange})),a=this.state.showUpdateProfileButton?r.a.createElement("div",null,r.a.createElement("button",{onClick:this.showUpdateProfileButton},"Volver"),r.a.createElement("form",{onSubmit:function(t){return e.handleFormSubmit(t)}},r.a.createElement("input",{type:"text",name:"username",value:this.state.user.username,autoComplete:"off",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"email",name:"email",value:this.state.user.email,autoComplete:"off",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"file",name:"photo",onChange:function(t){return e.handleChange(t)}}),r.a.createElement("input",{type:"submit",value:"Update Profile"}))):r.a.createElement("button",{onClick:this.showUpdateProfileButton},"Editar perfil");return r.a.createElement("div",null,r.a.createElement("h1",null,this.state.user.username),r.a.createElement("img",{id:"profile-photo",src:this.state.user.imgPath,alt:""}),a,t)}}]),t}(n.Component)),A=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("nav",null,r.a.createElement("div",null),r.a.createElement("div",null,r.a.createElement(T.a,{to:"/profile"},r.a.createElement("img",{src:"../../../public/perfil.png",alt:"profile"}))," -",r.a.createElement(T.a,{to:"/allRoutes"},"AllRoutes")," -"," ",r.a.createElement("img",{src:"./logout.png",alt:"logout",onClick:this.props.logout}))))}}]),t}(n.Component),B=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).getAllRoutes=function(){e.service.get("/allRoutes").then(function(t){e.setState(Object(s.a)({},e.state,{allRoutes:t.data.track})),console.log(t)})},e.followTrack=function(t,a){return t.preventDefault(),console.log(a),e.service.post("/".concat(a,"/followRoutes"),a).then(function(){e.props.getUser()})},e.state={allRoutes:null},e.service=f.a.create({baseURL:"".concat("https://thefoodroutes.herokuapp.com","/tracks"),withCredentials:!0}),e.getAllRoutes(),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state.allRoutes?this.state.allRoutes.map(function(t){return r.a.createElement("div",null,r.a.createElement("h2",null,t.routesName),r.a.createElement("h3",null,t.routesType),r.a.createElement("h4",null,t.category),r.a.createElement("img",{src:t.image,alt:""}),r.a.createElement("button",{onClick:function(a){return e.followTrack(a,t._id)}}),r.a.createElement("hr",null))}):r.a.createElement("h1",null,"Cargando...");return r.a.createElement("div",null,"Contenedor de Rutas",t)}}]),t}(n.Component),F=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).fetchUser=function(){e.authService.loggedin().then(function(t){return e.setState(Object(s.a)({},e.state,{user:t}))})},e.getUser=function(t){e.setState(Object(s.a)({},e.state,{user:t}))},e.logout=function(){e.authService.logout().then(function(){return e.setState(Object(s.a)({},e.state,{user:null}))})},e.createRoutes=function(t){console.log("funci\xf3n: createRoutes. Recibe: (siguiente console.log"),console.log(t),e.setState(Object(s.a)({},e.state,{route:t}))},e.state={user:null,route:null},e.authService=new y,e.inputYelp=new D,e.fetchUser(),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state.user?r.a.createElement("div",null,r.a.createElement(A,{logout:this.logout}),r.a.createElement(g.a,{path:"/profile",render:function(){return r.a.createElement(P,{getUser:e.getUser,user:e.state.user,createRoutes:e.createRoutes})}}),r.a.createElement(g.a,{path:"/allRoutes",render:function(){return r.a.createElement(B,{getUser:e.getUser})}})):r.a.createElement(g.a,{path:"/",render:function(){return r.a.createElement(O,{getUser:e.getUser,fetchUser:e.fetchUser})}});return r.a.createElement("div",{className:"App"},t)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var L=a(396);o.a.render(r.a.createElement(L.a,null,r.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[159,2,1]]]);
//# sourceMappingURL=main.abd34cbd.chunk.js.map