import React, { Component } from 'react';

import {
  ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity
} from 'react-native';

import Note from './Note';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      notes: [],
      noteText: '',
    };
  }

  addNote() {
    if (this.state.noteText) {
      this.state.notes.push({
        date: (new Date()).toString(),
        note: this.state.noteText
      });
      this.setState({
        noteText: '',
        notes: this.state.notes,
      });
    }
  }

  deleteNote(k) {
    this.state.notes.splice(k, 1);
    this.setState({ notes: this.state.notes });
  }

  render() {
    let notes = this.state.notes.map((val, key) => {
      return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Native Noter</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          { notes }
        </ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ noteText: text })}
            value={this.state.noteText}
            placeholder='note'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
          >
          </TextInput>
        </View>

        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
