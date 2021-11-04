import react from 'react';
import Layout from '../Layout';
import './VirtualComputerCourse.css'
import First_pane from './Blocks/First_Pane';
import Second_pane from './Blocks/Second_Pane';
import Third_Pane  from './Blocks/Third_Pane';
import Fourth_Pane from './Blocks/Fourth_Pane';
import Teachers from '../HomePage/Blocks/AmazingTeachersBlock'


export default function VirtualComputerCourse() {
      return(
         <Layout >
               <First_pane />
                <Second_pane />
                <Third_Pane />

                <div className="uk-margin-xlarge-top">
                <Teachers />
                </div>

                <Fourth_Pane />
               

         </Layout>
        
      )

}