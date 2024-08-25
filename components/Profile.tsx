import PromptCard from './PromptCard'

export interface IProfile {
  name: string,
  desc: string,
  data: any[],
  handleEdit?: Function,
  handleDelete?: Function,
}

const Profile = (p: IProfile) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{p.name} Profile</span>
      </h1>
      <p className='desc text-left'>{p.desc}</p>

      <div className='mt-10 prompt_layout'>
        {
          p.data.map((post) => (
            <PromptCard 
              key={post._id}
              post={post}
              handleEdit={() => p.handleEdit && p.handleEdit(post)}
              handleDelete={() => p.handleDelete && p.handleDelete(post)}
              handleTagClick={() => {}}
            />
          ))
        }
      </div>
    </section>
  )
}

export default Profile