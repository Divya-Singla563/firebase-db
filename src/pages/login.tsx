import { useState } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider
} from 'firebase/auth';
import { app } from '../firebase';
import './signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const auth = getAuth(app);
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User login:', userCredential.user);
            setSuccess(true);
            setEmail('');
            setPassword('');
        } catch (error: any) {
            setError(error.message || 'Failed to create account',);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleGithubLogin = async () => {
        try {
            console.log('0')
            const result = await signInWithPopup(auth, githubProvider);
            console.log(result, '1');

            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            console.log('GitHub User:', user);
            console.log('GitHub Token:', token);

            setSuccess(true);
        } catch (error: any) {
            console.error(error);
            setError(error.message || 'GitHub login failed');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            console.log('0')
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result, '1 google');

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            console.log('Google User:', user);
            console.log('Google Token:', token);

            setSuccess(true);
        } catch (error: any) {
            console.error(error);
            setError(error.message || 'Google login failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div className="signup-card">
                <div className="signup-header">
                    <h1 className="signup-title">login</h1>
                </div>

                {success && (
                    <div className="success-message">
                        <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        login successfully!
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="signup-form">


                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" password"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <button onClick={handleGithubLogin}>Login with GitHub</button>
                    <button onClick={handleGoogleLogin}>Login with Google</button>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                loggin in....
                            </>
                        ) : (
                            <>
                                <span>Login</span>
                                <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default Login;
