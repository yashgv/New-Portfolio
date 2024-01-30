const {google} = require("googleapis");
const keyFile = require("./credentials.json");

module.exports = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    
    const client = await auth.getClient();
    
    //instance of google sheets api
    const googleSheets = google.sheets({version : 'v4' , auth : client});
    
    const spreadsheetID = "1GueoVEHVsLGBGcM2VL46xZgW46cOLK4f0emZOLBuoas";
    
    //Get metadata about spread sheets
    
    // const metaData = await googleSheets.spreadsheets.get({
    //     auth: auth,
    //     spreadsheetId: spreadsheetID,
    // })
    
    //Read rows
    const ReadContacts = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Contacts",
    });
    const Contacts = ReadContacts.data.values;

    async function CreateContact(Name,Email,Message,date=Date().toString()){
        await googleSheets.spreadsheets.values.append({
            auth: auth,
            spreadsheetId: spreadsheetID,
            range: "Contacts",
            valueInputOption: "USER_ENTERED",
            resource: {
                values : [[Name,Email,Message,date]]
            }
        })
    }


    const ReadProjects = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Projects",
    });
    const Projects = ReadProjects.data.values;
    const ReadAchievements = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetID,
        range: "Achievements",
    });
    const Achievements = ReadAchievements.data.values;
    return {Contacts, Projects,Achievements, CreateContact};
}
