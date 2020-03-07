import React,{Component} from "react";
import {Redirect} from "react-router";
import UPortLogin from "../home/UPortLogin";
import Link from "react-router/lib/Link";

class Forms extends  Component{

    handleClick = () =>{
        console.log("button click");
        this.history.pushState(null,'uport')
    }

    render() {
        return(
            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <h1>Please enter uLink credentials</h1>
                        <form>
                            <label>
                                Login Id:
                                <input name="name" type="text"/>
                            </label>

                            <br/>
                            <label>
                                Password:
                                <input name="password" type="password"/>
                            </label>

                          <span className="input-group-btn">
                              <Link to="/dashboard"> Click here</Link>
                          </span>
                        </form>
                    </div>
                </div>
            </main>

        )
    }
}

export default Forms
