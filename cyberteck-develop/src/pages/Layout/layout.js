import { Container} from "@material-ui/core";
import FooterBlock from './Block/FooterBlock';
import HeaderBar from './Block/HeaderBar';
import './layout.css';

export default function Layout(props) {
    return (
        <Container maxWidth={false} disableGutters {...props}>
            <HeaderBar fillHeader={props.fillHeader}/>
            <div>
                {props.children}
            </div>
            <FooterBlock />
        </Container >
    );
}



