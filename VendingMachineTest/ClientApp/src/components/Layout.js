import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';
import { Redirect, Route } from 'react-router-dom';
import { UserPage } from './User/UserPage';
import AdminPanel from './Admin/AdminPanel';
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="main-container">
        <Sidebar />
        <div className="header-panel">
          <div className="header-panel__title-container">
            <span>IntraVision</span>
          </div>
        </div>
        <div className="content-container">
          <Redirect exact from="/" to="user" />
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
        </div>
      </div>
    );
  }
}
