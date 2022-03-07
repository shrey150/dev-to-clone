import PostFeed from "../../components/PostFeed"
import UserProfile from "../../components/UserProfile"
import { getPostsFromUser, getUserByUsername } from "../../lib/firebase"

export async function getServerSideProps({ query }) {

    const { username } = query;
    const userDoc = await getUserByUsername(username);

    let user = null
    let posts = null

    // if user exists, fetch their last 5 posts
    if (userDoc) {
        user = userDoc.data()
        posts = await getPostsFromUser(userDoc, 5)
    }

    return {
        props: { user, posts }
    }
    
}

export default function UserProfilePage({ user, posts }) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </main>
    )
}