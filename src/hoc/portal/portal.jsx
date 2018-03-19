import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const PORTAL_ID = 'portal-root';

const portalRoot = document.getElementById(PORTAL_ID);

/**
 * USAGE
 * Warning: using this the element will be out of the parent in the browser DOM
 * check Docs: https://reactjs.org/docs/portals.html
 *
 * Portal(Component): create a portal that sends the component at body level
 *
 * Portal(component, string): create a portal that sends the component to
 * the element with the string as id (dangerous, but usefull)
 */

function portal(WrappedComponent, mountId) {
  const mountElement = mountId
    ? document.getElementById(mountId)
    : portalRoot;
  return class extends Component {
    constructor(props) {
      super(props);
      this.el = document.createElement('div');
    }

    componentDidMount() {
      mountElement.appendChild(this.el);
    }

    componentWillUnmount() {
      mountElement.removeChild(this.el);
    }

    render() {
      return ReactDOM.createPortal(
        <WrappedComponent {...this.props} />,
        this.el,
      );
    }
  };
}

export default portal;

/*
     |'--'  '--'::'--'               _               `--`::`--`  `--`|
     |.__.  .__.::.__.:             / \             :.__.::.__.  .__.|
     |'--'  '--'::'--':            /_|_\            :`--`::`--`  `--`|
     !          ::    :           ( /'\ )           :    ::          !
     :.__.::.__.::.__.:       ///.\>   </.\\\        .__.:||__.::.__.:
     :'--'::'--'::'--':      //(.\>     </.)\\      :'--':||--'::'--':
     :.__.::.__.::.__.:     /(.\>         </.)\     :.__.::.__.::.__.:
     :'--'::'--'::'--':    //.\>           </.\\    :'--'::'--'::'--':
     :.__.::.__.::.__.:   /(.\>             </.)\   :.__.::.__.::.__.:
     :'--'::'--'::'--':-(/(.\>               </.)\)-:'--'::'--'::'--':
     :.__.::.__.::.__.:-(//.\>               </.\\)-:.__.::.__.::.__.:
     :'--'::'--'::'--':-(//.\>               </.\\)-:'--'::'--'::'--':
     :.__.;;.__.;;.__.:-(//.\>               </.\\)-:.__.;;.__.;;.__.:
     :'--';;'--';;'--':-(//.\>               </.\\)-:'--';;'--';;'--':
     :.__.;;.__.;;.__.:-(//.\>               </.\\)-:.__.;;.__.;;.__.:
cjr  :'--';;'--';;'--':-(//.\>               </.\\)-:'--';;'--';;'--':


                 =/;;/-
                +:    //
               /;      /;
              -X        H.
.//;;;:;;-,   X=        :+   .-;:=;:;%;.
M-       ,=;;;#:,      ,:#;;:=,       ,@
:%           :%.=/++++/=.$=           %=
 ,%;         %/:+/;,,/++:+/         ;+.
   ,+/.    ,;@+,        ,%H;,    ,/+,
      ;+;;/= @.  .H##X   -X :///+;
      ;+=;;;.@,  .XM@$.  =X.//;=%/.
   ,;:      :@%=        =$H:     .+%-
 ,%=         %;-///==///-//         =%,
;+           :%-;;;;;;;;-X-           +:
@-      .-;;;;M-        =M/;;;-.      -X
 :;;::;;-.    %-        :+    ,-;;-;:==
              ,X        H.
               ;/      %=
                //    +;
                 ,////,
*/
