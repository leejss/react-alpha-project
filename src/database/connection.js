import firebase from "../firebase";

export const connectionRef = firebase.database().ref(".info/connected");
