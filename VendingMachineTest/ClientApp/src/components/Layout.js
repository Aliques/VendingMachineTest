import React, { Component } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';
import { Redirect, Route } from 'react-router-dom';
import { UserPage } from './User/UserPage';
import AdminPanel2 from './Admin/AdminPanel2';
export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Sidebar />
        <div className="header-panel">
          <div className="header-panel__title-container">
            <span>IntraVision</span>
          </div>
        </div>
        <div className="content-container">
          <Redirect exact from="/" to="admin" />
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/admin">
            <AdminPanel2 />
          </Route>
        </div>
      </div>
    );
  }
}
