"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCreatePost } from "./hooks/useCreatePost";
import { useSearchParams } from "next/navigation";

export default function CreatePostIndex() {
  const {
    isLoading,
    error,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleTagsInput,
    handleCategoriesInput,
    removeTag,
    removeCategory,
    router,
  } = useCreatePost();

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter post title"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-foreground"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                placeholder="Brief summary of your post"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-foreground"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none font-mono text-sm"
                placeholder="Write your post content (Markdown supported)"
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-foreground"
              >
                Cover Image URL
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coverImage: e.target.files?.[0],
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-foreground"
              >
                Categories
              </label>
              <input
                type="text"
                id="categories"
                name="categories"
                onChange={handleCategoriesInput}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter categories separated by commas (e.g., Technology, Web Development)"
              />
              {formData.categories && formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="hover:text-primary/70 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-foreground"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                onChange={handleTagsInput}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter tags separated by commas (e.g., React, Next.js, TypeScript)"
              />
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:opacity-70 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Publish immediately
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-6 text-base font-semibold"
              >
                {isLoading ? "Creating..." : "Create Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="px-8 py-6 text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
