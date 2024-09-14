
return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
        <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="image">Profile Image:</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
            />
        </div>
        <button type="submit">Update Profile</button>
    </form>
);
}

// Add prop types validation
EditProfile.propTypes = {
    userId: PropTypes.string, // Make sure userId is a string
};

// Default props to avoid the prop being undefined initially
EditProfile.defaultProps = {
    userId: '', // Default value as an empty string
};

export default EditProfile;
