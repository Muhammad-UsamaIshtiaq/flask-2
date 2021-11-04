import {
    PageBlock, PrimaryText, BlogThumbnail
} from "../../../features/Atoms"
import {
    Grid,
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import blog1 from "./../../../images/blog1.jpg"
import blog2 from "./../../../images/blog2.jpg"
import blog3 from "./../../../images/blog3.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllBlog } from "./../../../DataStore/BlogReducer"
import Api from "../../../Api";

const BlogNewsBlock = () => {
    const loadAllBlogStatus = useSelector(state => state.blog.loadAllBlog)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllBlog());
            setMounted(true)
        }
    }, [])

    return (
        <PageBlock>
            <Grid xs={12} item>
                <PrimaryText className="marginGapBottom" >
                    Blog and&nbsp;
                    <b className="greenText">News</b>
                </PrimaryText>
            </Grid>
            <Grid xs={12} item >
                <Grid container spacing={5}>
                    {
                        loadAllBlogStatus.status === 'FULFILLED' &&
                        loadAllBlogStatus.data && loadAllBlogStatus.data.posts &&
                        loadAllBlogStatus.data.posts.slice(0, 3).map(blog =>
                            <BlogThumbnail title={blog.title} id={blog.id}
                            coverPic={Api.Media.getImage(blog.coverImage)} />
                        )
                    }
                </Grid>
            </Grid>
        </PageBlock>
    )
};

export default BlogNewsBlock;