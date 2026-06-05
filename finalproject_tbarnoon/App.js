import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, ImageBackground, Dimensions, TextInput,
TouchableHighlight, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
  state = {   
        accountName:'',
        // report is the home page so it shows first
        reportDisplay: 'none',
        gradeDisplay: 'none',
        accountDisplay: 'none',
        welcomeDisplay: 'flex',
        
        accounts: [
          { 
            id: 1, 
            name: 'Karel Dog', 
            // constant image if they dont enter one
            imageUrl: 'https://codehs.com/uploads/b813b7835da4e15876a267806a92acda', 
            gradeHistory: [],
            unweighted: '0.00',
            
          },
        ],
        newName: '',
        newImageUrl: 'https://codehs.com/uploads/894da4698104fd21bfa397917ca584b7',
        //will determine what account id info to iterate through
        selectedAccountId: 1,
        currentGradeInput: '',


    }
     // when you tap an account it becomes the selected one
     selectAccount = (id) => {
    this.setState({ selectedAccountId: id });
  } 
    addAccount = ()=>{
      if(!this.state.newName) return;
      this.setState({
        accounts:[...this.state.accounts,{
          id:this.state.accounts.length +1,
          name: this.state.newName,
          imageUrl: this.state.newImageUrl,
          gradeHistory: [],
          unweighted: '0.00',
        }],
        newName: '',
        newImageUrl:'https://codehs.com/uploads/894da4698104fd21bfa397917ca584b7',
      });
    }
     // takes the grade they typed and adds it to the selected accounts history
    addSingleGrade = () => {
      let newGrade = parseFloat(this.state.currentGradeInput);
      if (isNaN(newGrade) || newGrade < 0 || newGrade > 4.0) {
        alert("Invalid Grade. Enter a grade between 0 and 4.0");
        return;
      }
        // copys the accounts array so i dont have to write the state oneby one
      let updatedAccounts = [...this.state.accounts];
      let currentAccount = updatedAccounts.find(acc => acc.id === this.state.selectedAccountId);
      
      if (currentAccount) {
        currentAccount.gradeHistory.push(newGrade);
        let totalPoints = 0;
        for (let i = 0; i < currentAccount.gradeHistory.length; i++) {
          totalPoints += currentAccount.gradeHistory[i];
        }
        currentAccount.unweighted = (totalPoints / currentAccount.gradeHistory.length).toFixed(2);
      }
      
      this.setState({
        accounts: updatedAccounts,
        currentGradeInput: ''
      });
    }

render() {
  // find whichever account is currently selected to display its info
  let activeAccount = this.state.accounts[0];
    for (let i = 0; i < this.state.accounts.length; i++) {
    if (this.state.accounts[i].id === this.state.selectedAccountId) {
      activeAccount = this.state.accounts[i];
      break;
    }
  }
  return (
    <View style = {styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>GPA Tracker</Text>
      </View>
                <View style={{display: this.state.welcomeDisplay, flex: 1}}>
                  
                <ScrollView style={styles.pad}>
                      <View style={styles.formView2}>
                          <Text style={styles.welcomeHeading}>
                              Welcome
                          </Text>
                          
                          <View style={styles.welcomeSection}>
                              <Text style={styles.welcomeSectionTitle}>Report Page</Text>
                              <Text style={styles.welcomeSectionBody}>
                                  Used to view your added up GPA.
                              </Text>
                          </View>
 
                          <View style={styles.welcomeSection}>
                              <Text style={styles.welcomeSectionTitle}> + Grades Page</Text>
                              <Text style={styles.welcomeSectionBody}>
                                  For adding grades to your report.
                              </Text>
                          </View>
 
                          <View style={styles.welcomeSection}>
                              <Text style={styles.welcomeSectionTitle}>Profile Page</Text>
                              <Text style={styles.welcomeSectionBody}>
                                  is Located on the bottom right, this is used to add and switch accounts.
                              </Text>
                          </View>
                      </View>
                  </ScrollView>
                </View>
                <View style={{display: this.state.reportDisplay, flex:1,}}>
                    <View style={styles.main}>

                        <View style={styles.profileContainer}>
                            <View style={styles.profilePicContainer}>
                                <Image source={{ uri: activeAccount.imageUrl }} style={styles.largeProfilePic}/>
                            </View>
                            <View style={styles.profileTextContainer}>
                                <Text style={styles.studentNameText}>{activeAccount.name}</Text>
                                <Text style={styles.activeProfileText}>Active Profile</Text>
                            </View>
                        </View>

                        <View style={styles.gpaContainer}>
                            <Text style={styles.unweightedText}>Unweighted GPA</Text>
                            <Text style={styles.gpaNumber}>{activeAccount.unweighted}</Text>
                            <Text style={styles.gradesRecordedText}>Grades recorded: {activeAccount.gradeHistory.length}</Text>
                        </View>
                    </View>
                </View>
              <View style={{display: this.state.gradeDisplay, flex:1,}}>
                    <ScrollView style={styles.pad}>
                        
                        {/* input section for grade */}
                        <View style={styles.formView}>
                            <Text style={styles.formTitle}>Add Grade for {activeAccount.name}</Text>
                            
                            <TextInput 
                              style={styles.formInput}
                              placeholder="Enter Grade (for example 3.3)"
                              keyboardType="numeric"
                              value={this.state.currentGradeInput}
                              onChangeText={(text) => this.setState({ currentGradeInput: text })}
                            />

                            <TouchableHighlight onPress={this.addSingleGrade}>
                                <View style={styles.createButton}>
                                    <Text style={styles.createButtonText}>Submit Grade</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        {/* GPA reference */}
                        <View style={styles.formView2}>
                            <Text style={styles.formTitle}>
                              GPA Reference Scale
                            </Text>
                      
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>A+ / A</Text>
                              <Text style={styles.scaleRight}>4.0</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>A -</Text>
                              <Text style={styles.scaleRight}>3.8</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>B+</Text>
                              <Text style={styles.scaleRight}>3.5</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>B</Text>
                              <Text style={styles.scaleRight}>3.2</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>B-</Text>
                              <Text style={styles.scaleRight}>2.7</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>C+</Text>
                              <Text style={styles.scaleRight}>2.3</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>C</Text>
                              <Text style={styles.scaleRight}>2.0</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>D</Text>
                              <Text style={styles.scaleRight}>1.0</Text>
                            </View>
                            <View style={styles.scaleRow}>
                              <Text style={styles.scaleLeft}>F</Text>
                              <Text style={styles.scaleRight}>0.0</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
                {/*accounts*/}
                <View style={{display: this.state.accountDisplay, flex:1}}>
                    <ImageBackground
                      style={styles.background}
                      source={{ uri: 'https://codehs.com/uploads/b769e83ebec7573e2102fa40df3c670a' }}
                    >
                      <View style={styles.main}>
                        <ScrollView>
                        <View style = {styles.headerView}>
                          <Text style = {styles.accountHeader}>Accounts</Text>
                        </View>
                        {/*account switch highights when pressed*/}
                        {this.state.accounts.map(acc=>(
                          <TouchableHighlight
                            key={acc.id}
                            onPress={() => this.selectAccount(acc.id)}
                            underlayColor="#e0f5f8"
                          >
                            <View style = {[styles.accountRow, this.state.selectedAccountId === acc.id && styles.accountRowSelected
                            ]}>
                            <Image
                              source={{ uri: acc.imageUrl }}
                              style={styles.accountPro}
                              resizeMode="cover"
                            />
                         <Text style={styles.accountNameText}>{acc.name}</Text>
                            </View>
                          </TouchableHighlight>
                ))}
                        </ScrollView>
                        {/*account profil*/}
                        <View style={styles.formView}>
                           <Text style = {styles.formTitle}>New Student Profile</Text>
                           <TextInput
                            style={styles.formInput}
                            value={this.state.newImageUrl}
                            onChangeText={(text)=>this.setState({newImageUrl:text})}
                           /> 
                           <TextInput
                              style={styles.formInput}
                              placeholder="New Student"
                              value={this.state.newName}
                              onChangeText={(text) => this.setState({ newName: text })}
                            />
                          <TouchableHighlight onPress={this.addAccount} underlayColor="#b8416a">
                            <View style={styles.createButton}>
                            <Text style={styles.createButtonText}>Create Account</Text>
                            </View>
                          </TouchableHighlight>
                        </View>

                      

                      </View>
                    </ImageBackground>
                </View>
            
                <View style={styles.footer}>
                  <TouchableHighlight
                        onPress={() => this.setState({
                            reportDisplay: 'none',
                            gradeDisplay: 'none',
                            accountDisplay: 'none',
                            welcomeDisplay:'flex',
                        })}
                    >
                        <View style={styles.navButton}>
                            <Text style={styles.navText}>
                                Home
                            </Text>
                        </View>
                    </TouchableHighlight>
                  <TouchableHighlight
                        onPress={() => this.setState({
                            reportDisplay: 'flex',
                            gradeDisplay: 'none',
                            accountDisplay: 'none',
                            welcomeDisplay:'none',
                        })}
                    >
                        <View style={styles.navButton}>
                            <Text style={styles.navText}>
                                Report
                            </Text>
                        </View>             
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.setState({
                            reportDisplay: 'none',
                            gradeDisplay: 'flex',
                            accountDisplay: 'none',
                            welcomeDisplay:'none',
                        })}
                    >
                        <View style={styles.navButton}>
                            <Text style={styles.navText}>
                                + Grades
                            </Text>
                        </View>             
                    </TouchableHighlight>
  
                    <TouchableHighlight
                        onPress={() => this.setState({
                            reportDisplay: 'none',
                            gradeDisplay: 'none',
                            accountDisplay: 'flex',
                            welcomeDisplay:'none',
                        })    
                        }
                    >
                      {/*bottom right image*/}
                         <View style={styles.centerCircleButton}>
                          <Image
                          // the find function iterates through the list id through the variable acc to equal the selectedaccountID and then once it finds it, it will take the imageUrl of that given id in the list
                            source={{uri: this.state.accounts.find(acc => acc.id === this.state.selectedAccountId)?.imageUrl }}
                            style={styles.centerCircleImage}
                            resizeMode="cover"
                            />
                        </View>              
                    </TouchableHighlight>
                </View>
    </View>
  )}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#f5f7fa",
  },
  header:{
    height: deviceHeight/7,
    backgroundColor: '#a9e4ec',
    borderBottomWidth: 3,
    borderColor: '#37aed0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold', 
    fontFamily: 'Arial',
  },
  footer:{
      height: deviceHeight/7,
      backgroundColor: '#a9e4ec',
      borderTopWidth: 3,
      borderColor: '#37aed0',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
  },
  navButton:{
      backgroundColor: '#f0f9fb',
      width: 80,
      height: 40,
      margin:4,
      
      borderBottomWidth: 2,
      borderColor: '#37aed0',
      justifyContent:'center',
      alignItems:'center'
  },
  centerCircleButton: {
    width: 60,
    height: 60,
    borderRadius: 38,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor:'#37aed0'
  },
  navText:{
      color: '#37aed0',
      fontSize: 11,
      fontFamily: 'Arial',
      fontWeight: '600',
  },
  main:{
    flex:1,
  },
  centerCircleImage:{
    width: '100%',
    height: '100%',
    borderRadius: 38,
  },
  background: {
  flex: 1,
  width: '100%',
  height: '100%',
  },
  accountHeader:{
    color: 'grey',
    fontWeight: '700',
    fontSize: 26,
    fontFamily: 'Arial',
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  accountRowSelected: {
    borderColor: '#37aed0',
  },
  accountNameText: {
    color: '#d4537e',
    fontWeight: '600',
    fontSize: 17,
  },
  accountPro: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#37aed0',
    marginRight: 10,
    backgroundColor: 'ddd',
},
formView:{
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  marginBottom: 20,
},
formView2:{
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  marginBottom: 20,
  borderColor: '#37aed0', 
  borderWidth: 2,
},
formTitle: {
  fontWeight: 'bold',
  fontSize: 15,
  color: '#222',
  marginBottom: 10,
},
formInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: 8,
  fontSize: 13,
  marginBottom: 10,
  backgroundColor: 'white',
},
createButton: {
  backgroundColor: '#d4537e',
  borderRadius: 8,
  padding: 12,
  alignItems: 'center',
},
headerView: {
  padding: 12,
  marginTop:10,
  marginBottom:10,
  width:deviceWidth,
  height:60,
  alignItems: 'center',
  borderRadius: 150,
  borderColor:'#37aed0',
  backgroundColor:'white',
},

createButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15,
},
profileContainer: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 15,
  flexDirection: 'row',
  alignItems: 'center',
  margin: 15,
},
profilePicContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginRight: 15,
},
largeProfilePic: {
  width: 50,
  height: 50,
  borderRadius: 25,
},
profileTextContainer: {
  justifyContent: 'center',
},
studentNameText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#d4537e',
},
activeProfileText: {
  color: 'gray',
  fontSize: 13,
},
gpaContainer: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 25,
  alignItems: 'center',
  margin: 15,
},
unweightedText: {
  fontSize: 16,
  color: 'grey',
  fontWeight: 'bold',
},
gpaNumber: {
  fontSize: 55,
  fontWeight: 'bold',
  color: '#37aed0',
  marginVertical: 5,
},
gradesRecordedText: {
  fontSize: 13,
  color: 'grey',
},
scaleRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#f5f5f5',
},
scaleLeft: {
  fontSize: 14,
  fontWeight: '600',
  color: '#555',
  fontFamily: 'Arial',
},
scaleRight: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#37aed0',
  fontFamily: 'Arial',
},
pad:{
  padding: 15,
},
welcomeTitle:{
  fontWeight: 'bold', 
  fontSize: 15, 
  color: '#37aed0',
  textAlign:'center',
},
welcomeHeading: {
  fontSize: 22,
  textAlign: 'center',
  color: '#d4537e',
  marginBottom: 15,
  fontWeight: 'bold',
},
welcomeSection: {
  marginBottom: 12,
},
welcomeSectionTitle: {
  fontWeight: 'bold',
  fontSize: 15,
  color: '#37aed0',
},
welcomeSectionBody: {
  marginTop: 4,
  paddingLeft: 10,
},
});