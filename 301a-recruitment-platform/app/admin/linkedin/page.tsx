"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LinkedInContent() {
  const [isConnected, setIsConnected] = useState(false);
  const [credentials, setCredentials] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Check if we have credentials from OAuth callback
    const success = searchParams.get("success");
    const data = searchParams.get("data");
    const error = searchParams.get("error");

    if (success && data) {
      try {
        // Decode base64 in browser
        const decoded = JSON.parse(atob(data));
        setCredentials(decoded);
        setIsConnected(true);
        setMessage("✅ LinkedIn connected successfully! Copy the values below to your .env file.");
      } catch (e) {
        setMessage("⚠️ Failed to decode credentials");
      }
    }

    if (error) {
      setMessage(`❌ Error: ${decodeURIComponent(error)}`);
    }
  }, [searchParams]);

  const handleConnect = () => {
    setLoading(true);
    // Redirect to LinkedIn OAuth
    window.location.href = "/api/linkedin/auth";
  };

  const handlePostJob = async (jobId: string) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();

      if (result.ok) {
        setMessage(`✅ ${result.message}`);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setMessage(`❌ Failed to post job: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="text-[#00BFFF] hover:underline mb-4"
          >
            ← Back to Admin
          </button>
          <h1 className="text-3xl font-bold mb-2">LinkedIn Auto-Poster</h1>
          <p className="text-gray-400">
            Connect your LinkedIn company page to automatically post jobs
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.startsWith("✅")
                ? "bg-green-900/50 border border-green-500"
                : "bg-red-900/50 border border-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* Connection Status */}
        <div className="bg-[#1a2942] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Connection Status</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isConnected ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              <span>
                {isConnected ? "Connected to LinkedIn" : "Not connected"}
              </span>
            </div>
            {!isConnected && (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="bg-[#0077b5] hover:bg-[#006097] text-white px-6 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "Connecting..." : "Connect LinkedIn"}
              </button>
            )}
          </div>
        </div>

        {/* Credentials Display */}
        {credentials && (
          <div className="bg-[#1a2942] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">LinkedIn Credentials</h2>
            
            {/* Instructions for getting Organization ID */}
            {!credentials.organizationId && (
              <div className="mb-4 p-4 bg-blue-900/30 border border-blue-500 rounded-lg">
                <h3 className="font-bold text-blue-200 mb-2">📋 Get Your Organization ID:</h3>
                <ol className="text-sm text-blue-100 space-y-1 list-decimal list-inside">
                  <li>Go to your LinkedIn Company Page: <a href="https://www.linkedin.com/company/301atech" target="_blank" className="underline">linkedin.com/company/301atech</a></li>
                  <li>Look at the URL - it should be: <code className="bg-black px-1">linkedin.com/company/301atech/</code></li>
                  <li>The organization ID is the number in the URL, OR</li>
                  <li>View page source (Ctrl+U) and search for "companyId" - that's your organization ID</li>
                  <li>Enter it below</li>
                </ol>
              </div>
            )}
            
            <p className="text-gray-400 mb-4">
              Copy these values to your <code className="bg-black px-2 py-1 rounded">.env.local</code> and Vercel environment variables:
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">Access Token:</label>
                <input
                  type="text"
                  readOnly
                  value={credentials.access_token}
                  className="w-full bg-black text-white p-3 rounded font-mono text-sm mt-1"
                  onClick={(e) => e.currentTarget.select()}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Organization ID (enter manually):</label>
                <input
                  type="text"
                  value={credentials.organizationId}
                  onChange={(e) => setCredentials({...credentials, organizationId: e.target.value})}
                  placeholder="Enter your LinkedIn company page organization ID"
                  className="w-full bg-black text-white p-3 rounded font-mono text-sm mt-1 border border-gray-600"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Expires At:</label>
                <input
                  type="text"
                  readOnly
                  value={credentials.expires_at}
                  className="w-full bg-black text-white p-3 rounded font-mono text-sm mt-1"
                />
              </div>

              {credentials.refresh_token && (
                <div>
                  <label className="text-sm text-gray-400">Refresh Token:</label>
                  <input
                    type="text"
                    readOnly
                    value={credentials.refresh_token}
                    className="w-full bg-black text-white p-3 rounded font-mono text-sm mt-1"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <p className="text-sm text-yellow-200">
                <strong>Important:</strong> Add these to your <code>.env.local</code>:
                <br />
                <code className="text-xs">LINKEDIN_ACCESS_TOKEN={credentials.access_token}</code>
                <br />
                <code className="text-xs">LINKEDIN_ORGANIZATION_ID={credentials.organizationId}</code>
              </p>
            </div>
          </div>
        )}

        {/* Quick Test */}
        {isConnected && (
          <div className="bg-[#1a2942] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Test Posting</h2>
            <p className="text-gray-400 mb-4">
              Coming soon: Select jobs to post to LinkedIn automatically
            </p>
            <button
              onClick={() => router.push("/admin/linkedin/scheduler")}
              className="bg-[#00BFFF] hover:bg-[#0099cc] text-white px-6 py-2 rounded-lg"
            >
              Go to Job Scheduler →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LinkedInAdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <LinkedInContent />
    </Suspense>
  );
}
