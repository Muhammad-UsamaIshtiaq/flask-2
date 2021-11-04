
import windows_icon from "./../images/windows-380x380.png"
import webcam_icon from "./../images/webCam-380x380.png"
import minecraft_icon from "./../images/mincraft-380x380.png"
import internate_icon from "./../images/internet-380x380.png"

export default {
    get: (type, key, field) => {
        return type[key]
            ? type[key][field] || null
            : null;
    },
    Strip: {
        publicKey: //'pk_live_51J0SkDIJV61VXnla9AfsFZuei5jPHf4SFtBFrOultPbhGR1OEfe8A7yVszczhKAN99wSZfr0SnGhjpBMTq66xE7200G3zxWRSn'
        'pk_test_51J0SkDIJV61VXnla2zDtUjuA3HKJ35SWDFXEgAAo3fdOPpk4wX8BByoPCql810KdIlBQzAkqyU2GSDRmCUrWVkV900Aqh2Qlzj'
    },
    CourseType: {
        'VIRTUAL_ONE_ON_ONE': {
            id: 'VIRTUAL_ONE_ON_ONE',
            displayName: 'Virtual One on One'
        },
        'VIRTUAL_TECH_CAMP': {
            id: 'VIRTUAL_TECH_CAMP',
            displayName: 'Virtual Tech Camp'
        },
        'VIRTUAL_SMALL_GROUP': {
            id: 'VIRTUAL_SMALL_GROUP',
            displayName: 'Virtual Small Group'
        },
        'AT_SCHOOL_LOCATION': {
            id: 'AT_SCHOOL_LOCATION',
            displayName: 'At School Location'
        }
    },
    CourseCategory: {
        'COMPUTER_COURSE': {
            id: 'COMPUTER_COURSE',
            displayName: 'Computer Course'
        },
        'TECH_CAMP': {
            id: 'TECH_CAMP',
            displayName: 'Tech Camp'
        }
    },
    ContactUsOptions: {
        'GENERAL': {
            id: 'GENERAL',
            displayName: 'General'
        }
    },
    SkillLevel: {
        'BEGINNER': {
            id: 'BEGINNER',
            displayName: 'Beginner'
        },
        'INTERMEDIATE': {
            id: 'INTERMEDIATE',
            displayName: 'Intermediate'
        },
        'EXPART': {
            id: 'EXPART',
            displayName: 'Expert'
        },
        'BEGINNER_INTERMEDIATE': {
            id: 'BEGINNER_INTERMEDIATE',
            displayName: 'Beginner-Intermediate'
        },
    },
    Grade: {
        '1-3': {
            id: '1-3',
            displayName: '1-3'
        },
        '4-5': {
            id: '4-5',
            displayName: '4-5'
        },
        '4-7': {
            id: '4-7',
            displayName: '4-7'
        },
        '8-13': {
            id: '8-13',
            displayName: '8-13'
        }
    },
    Requirements: {
        'WIN_MAC': {
            id: 'WIN_MAC',
            icon: windows_icon,
            displayName: 'Windows or MAC PC Only'
        },
        "INTERNATE": {
            id: 'INTERNATE',
            icon: internate_icon,
            displayName: 'Stable Internate Connection'
        },
        "WEBCAM": {
            id: 'WEBCAM',
            icon: webcam_icon,
            displayName: 'Webcam'
        },
        "MINCRAFT_JAVA": {
            id: 'MINCRAFT_JAVA',
            icon: minecraft_icon,
            displayName: 'Minecraft Java Edition'
        },
    },
    State: {
        'DC':{
            id: 'DC',
            displayName: 'DC'
        },
        'VIRGINIA':{
            id: 'VIRGINIA',
            displayName: 'Virginia'
        },
        'FAIRFAX':{
            id: 'FAIRFAX',
            displayName: 'Fairfax'
        },
        'MONTGOMERY_COUNTY':{
            id: 'MONTGOMERY_COUNTY',
            displayName: 'Montgomery County'
        },
        'HOWARD_COUNTY':{
            id: 'HOWARD_COUNTY',
            displayName: 'Howard County'
        },
        'PRINCE_WILLIAM_COUNTY':{
            id: 'PRINCE_WILLIAM_COUNTY',
            displayName: 'Prince William County'
        },
    },
    BlogCategory: {
        'UNCATEGORIZED': {
            id: 'UNCATEGORIZED_BLOG',
            displayName: 'Uncategorized'
        },
        'MINECRAFT': {
            id: 'MINECRAFT_BLOG',
            displayName: 'Minecraft'
        },
        'MATH': {
            id: 'MATH',
            displayName: 'Math'
        },
        'ROBLOX': {
            id: 'ROBLOX',
            displayName: 'Roblox'
        },
        'COMPUTER_COURSES': {
            id: 'COMPUTER_COURSES',
            displayName: 'Computer Courses'
        },
        'BENIFITS_OF_ONLINE_EDUCATION': {
            id: 'BENIFITS_OF_ONLINE_EDUCATION',
            displayName: 'Benefits of Online Education'
        },
        'HOW_TO_LEARN': {
            id: 'HOW_TO_LEARN',
            displayName: 'How to learn'
        },
        'TUTORING': {
            id: 'TUTORING',
            displayName: 'Tutoring'
        }
    }

};
